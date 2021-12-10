import * as functions from "firebase-functions";
import * as ClientOAuth2 from "client-oauth2";
import * as admin from "firebase-admin";
import {
  DocumentSnapshot,
  QueryDocumentSnapshot,
} from "firebase-functions/lib/providers/firestore";
import {APIResponseError, Client, NotionClientError} from "@notionhq/client";
import * as moment from "moment";

/* environment configuration terminal command
firebase functions:config:set notion.auth.token_path="v1/oauth/token" notion.auth.token_host="https://api.notion.com" notion.auth.authorize_host="https://api.notion.com" notion.auth.authorize_path="/v1/oauth/authorize" notion.client.secret="secret_teXWe1eiAFLm8dlAWcUI75vxeikPZd1ZkB0NpAfTyV3" notion.client.id="2bc4e06e-c887-4c1e-8e5f-217beba1359e" notion.demo.token="secret_UVWihdrzxdw8uw7t6O8nR14pkhuggLUR49e1oBGHuow" notion.demo.database="7a2ec067-59d8-4e8b-a189-63895e9668ad"
*/

admin.initializeApp();
const db = admin.firestore();
const notionOauthConfig = functions.config().notion ?
  functions.config().notion :
  {};
notionOauthConfig.auth.tokenHost = notionOauthConfig.auth.token_host;
notionOauthConfig.auth.tokenPath = notionOauthConfig.auth.token_path;
notionOauthConfig.auth.authorizeHost = notionOauthConfig.auth.authorize_host;
notionOauthConfig.auth.authorizePath = notionOauthConfig.auth.authorize_path;

delete notionOauthConfig.auth.authorize_path;
delete notionOauthConfig.auth.authorize_host;
delete notionOauthConfig.auth.token_path;
delete notionOauthConfig.auth.token_host;

// const redirectUrl = process.env.FUNCTIONS_EMULATOR?
// const redirectUrl = "http://localhost:3005/onboard";
// const redirectUrl = "https://app.notion.coffee/notion";
const redirectUrl = "https://react-coffee-a2736.web.app/onboard";

const notionOauth = new ClientOAuth2({
  clientId: notionOauthConfig.client.id,
  clientSecret: notionOauthConfig.client.secret,
  accessTokenUri:
    notionOauthConfig.auth.tokenHost + notionOauthConfig.auth.tokenPath,
  authorizationUri:
    notionOauthConfig.auth.authorizeHost + notionOauthConfig.auth.authorizePath,
  redirectUri: redirectUrl,
  scopes: [],
});

functions.logger.info("notion oauth", notionOauth);

export const oauthUrl = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      functions.logger.info("start with context" + context);
      const uid = context.auth?.uid;
      if (uid) {
        try {
          functions.logger.info("inside try with uid: " + uid);
          const authorizationUri = notionOauth.code.getUri(
              {
                state: "A", query: {owner: "user"},
              }
          );
          functions.logger.info(authorizationUri);
          return {redirectUrl: authorizationUri};
        } catch (e) {
          functions.logger.error("An internal error" + e);
          throw new functions.https.HttpsError("internal", e);
        }
      } else {
        throw new functions.https.HttpsError("unauthenticated", "No user");
      }
    });

export const oauthToken = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      const uid: string | undefined = context.auth?.uid;
      if (uid) {
        const code: string = data.code as string;
        return notionOauth.code
            .getToken(redirectUrl + "?code=" + code + "&state=A", {
              body: {
                code: code,
                redirect_uri: redirectUrl,
                grant_type: "authorization_code",
              },
              state: "A",
            })
            .then((token: any) => {
              const userRef = db.collection("notionAuth").doc(uid? uid:"");
              userRef.get().then((d: any) => d.exists);
              return userRef
                  .set(token.data)
                  .then(() => {
                    return {
                      success: true,
                      workspaceIcon: token.data.workspace_icon,
                      workspace: token.data.workspace_name,
                    };
                  })
                  .catch((error: any) => {
                    functions.logger.error("Access Token Error\n", error);
                    throw new functions.https.HttpsError("internal", error);
                  });
            })
            .catch((error: any) => {
              functions.logger.error("Code get Token Error\n", error);
              throw new functions.https.HttpsError("internal", error);
            });
      } else {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "Not authenticated"
        );
      }
      const code: string = data.code as string;
      if (!code) {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "No code in request body"
        );
      }
      const fullUrl = redirectUrl + "?code=" + code + "&state=A" +
        "&owner=user";
      return notionOauth.code
          .getToken(fullUrl, {
            body: {
              code: code,
              redirect_uri: redirectUrl,
              grant_type: "authorization_code",
            },
            state: "A",
          })
          .then((token: any) => {
            const userRef = db.collection("notionAuth").doc(uid? uid:"");
            userRef.get().then((d: any) => d.exists);
            return userRef
                .set(token.data)
                .then(() => {
                  return {
                    success: true,
                    workspaceIcon: token.data.workspace_icon,
                    workspace: token.data.workspace_name,
                  };
                })
                .catch((error: any) => {
                  functions.logger.error("Access Token Error\n", error);
                  throw new functions.https.HttpsError("internal", error);
                });
          })
          .catch((error: any) => {
            functions.logger.error("Code get Token Error\n", error);
            throw new functions.https.HttpsError("internal", error);
          });
    });

export const listpages = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      const uid: string | undefined = context.auth?.uid;
      const query: string | undefined = data.query;
      if (uid) {
        return db
            .collection("notionAuth")
            .doc(uid)
            .withConverter(tokenConverter)
            .get()
            .then((doc: DocumentSnapshot) => {
              const documentData = doc.data();
              if (
                documentData &&
            Object.prototype.hasOwnProperty.call(documentData, "accessToken")
              ) {
                const notion = new Client({auth: documentData.accessToken});
                return notion
                    .search({
                      query: query,
                      filter: {
                        value: "page",
                        property: "object",
                      },
                    })
                    .then((res) => {
                      return {
                        pages: res.results,
                        workspace: {
                          workspaceName: documentData?.workspaceName,
                          workspaceIcon: documentData?.workspaceIcon,
                        },
                      };
                    })
                    .catch((error: NotionClientError) => {
                      functions.logger.error(
                          "Error retrieving database:\n",
                          error
                      );
                      throw new functions.https.HttpsError(
                          "unknown",
                          error.message,
                          error
                      );
                    });
              } else {
                throw new functions.https.HttpsError(
                    "failed-precondition",
                    "No token in doc"
                );
              }
            });
      } else {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "Not authenticated"
        );
      }
    });

export const listdatabases = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      const uid: string | undefined = context.auth?.uid;
      const query: string | undefined = data.query;
      functions.logger.info("Query supplied is: \n", query);
      if (uid) {
        return db
            .collection("notionAuth")
            .doc(uid)
            .withConverter(tokenConverter)
            .get()
            .then((doc: DocumentSnapshot) => {
              const documentData = doc.data();
              if (
                documentData &&
            Object.prototype.hasOwnProperty.call(documentData, "accessToken")
              ) {
                const notion = new Client({auth: documentData.accessToken});
                return notion
                    .search({
                      query: query,
                      filter: {
                        value: "database",
                        property: "object",
                      },
                    })
                    .then((res) => {
                      return {
                        databases: res.results,
                        workspace: {
                          workspaceName: documentData?.workspaceName,
                          workspaceIcon: documentData?.workspaceIcon,
                        },
                      };
                    })
                    .catch((error: NotionClientError) => {
                      functions.logger.error(
                          "Error retrieving database:\n",
                          error
                      );
                      throw new functions.https.HttpsError(
                          "unknown",
                          error.message,
                          error
                      );
                    });
              } else {
                throw new functions.https.HttpsError(
                    "failed-precondition",
                    "No token in doc"
                );
              }
            });
      } else {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "Not authenticated"
        );
      }
    });

export const getdatabase = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      const uid: string | undefined = context.auth?.uid;
      const databaseId: string | undefined = data.databaseId;
      if (!databaseId) {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "Database id not provided"
        );
      }
      if (uid) {
        return db
            .collection("notionAuth")
            .doc(uid)
            .withConverter(tokenConverter)
            .get()
            .then((doc: DocumentSnapshot) => {
              const documentData = doc.data();
              if (
                documentData &&
            Object.prototype.hasOwnProperty.call(documentData, "accessToken")
              ) {
                const notion = new Client({auth: documentData.accessToken});
                return notion.databases
                    .retrieve({database_id: databaseId})
                    .then((res) => {
                      return {
                        database: res,
                        workspace: {
                          workspaceName: documentData?.workspaceName,
                          workspaceIcon: documentData?.workspaceIcon,
                        },
                      };
                    })
                    .catch((error: NotionClientError) => {
                      throw new functions.https.HttpsError(
                          "unknown",
                          error.message,
                          error
                      );
                    });
              } else {
                throw new functions.https.HttpsError(
                    "failed-precondition",
                    "No token in doc"
                );
              }
            });
      } else {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "Not authenticated"
        );
      }
    });

export const saveSingleTask = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      const uid: string | undefined = context.auth?.uid;
      const taskDescription: string = data.description;
      const propertiesObject: any = {
        Task: {
          title: [
            {
              type: "text",
              text: {
                content: taskDescription,
              },
            },
          ],
          type: "title",
        },
      };
      if (data.priority) {
        propertiesObject.Priority = {
          number: data.priority,
          type: "number",
        };
      }
      const categories: any[] = [];
      if (data.categories) {
        for (const cat of data.categories) {
          categories.push({name: cat});
        }
        propertiesObject.Categories = {
          type: "multi_select",
          multi_select: categories,
        };
      }
      if (data.year || data.month || data.date) {
        propertiesObject["Due Date"] = {
          type: "date",
          date: {
            start: moment({
              year: data.year,
              month: data.month,
              date: data.date,
            }).toISOString(),
          },
        };
      }
      if (uid) {
        return db
            .collection("notionAuth")
            .doc(uid)
            .withConverter(tokenConverter)
            .get()
            .then((doc: any) => {
              const docData = doc.data();
              return db
                  .collection("users")
                  .doc(uid)
                  .get()
                  .then((user: any) => {
                    const userData = user.data();
                    const notion = new Client({
                      auth: docData?.accessToken,
                    });
                    return notion.pages
                        .create({
                          parent: {
                            database_id: userData?.database,
                          },
                          properties: propertiesObject,
                        })
                        .then((notionResponse) => {
                          return {
                            notionResponse: notionResponse,
                            addedTask: data,
                          };
                        })
                        .catch((error: APIResponseError) => {
                          throw new functions.https.HttpsError(
                              "internal",
                              error.message
                          );
                        });
                  });
            });
      } else {
        const notion = new Client({auth: notionOauthConfig.demo.token});
        return notion
            .request({
              path: "pages",
              method: "post",
              body: {
                parent: {database_id: notionOauthConfig.demo.database},
                properties: propertiesObject,
              },
            })
            .then((notionResponse) => {
              return {notionResponse: notionResponse, addedTask: data};
            })
            .catch((error) => {
              functions.logger.error(error);
              throw new functions.https.HttpsError("internal", error.message);
            });
      }
    });

export const createUserDocument = functions
    .region("europe-west3")
    .auth.user()
    .onCreate((user) => {
      db.collection("users").doc(user.uid).create({});
    });

const tokenConverter = {
  /**
   * Translates to firestore
   * @param {object} token The provided token.
   * @return {object} The token in camelcase.
   */
  toFirestore: function(token: any) {
    return {
      access_token: token.access_token,
      bot_id: token.bot_id,
      workspace_icon: token.workspace_icon,
      workspace_name: token.workspace_name,
      token_type: token.token_type,
    };
  },
  /**
   * Translates from firestore
   * @param {object} snapshot The provided token.
   * @return {object} The token in camelcase.
   */
  fromFirestore: function(snapshot: QueryDocumentSnapshot) {
    const data = snapshot.data();
    return new Token(
        data.access_token,
        data.token_type,
        data.bot_id,
        data.workspace_name,
        data.workspace_icon
    );
  },
};

/**
 * Class for camel case token
 */
class Token {
  accessToken: string;
  tokenType: string;
  botId: string;
  workspaceIcon: string;
  workspaceName: string;
  /**
   * Constructor for class
   * @param {string} accessToken The provided token.
   * @param {string} tokenType The provided token.
   * @param {string} botId The provided token.
   * @param {string} workspaceName The provided token.
   * @param {string} workspaceIcon The provided token.
   */
  constructor(
      accessToken: string,
      tokenType: string,
      botId: string,
      workspaceName: string,
      workspaceIcon: string
  ) {
    this.accessToken = accessToken;
    this.tokenType = tokenType;
    this.botId = botId;
    this.workspaceName = workspaceName;
    this.workspaceIcon = workspaceIcon;
  }
}

export const embedPinCode = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      const uid: string | undefined = context.auth?.uid;
      if (uid) {
        return db
            .collection("users")
            .doc(uid)
            .get()
            .then((doc: DocumentSnapshot) => {
              const userData = doc.data();
              if (
                userData &&
            Object.prototype.hasOwnProperty.call(userData, "pinCode")
              ) {
                db.collection("notionAuth")
                    .doc(uid)
                    .withConverter(tokenConverter)
                    .get()
                    .then((doc: DocumentSnapshot) => {
                      const documentData = doc.data();
                      if (
                        documentData &&
                  Object.prototype.hasOwnProperty.call(
                      documentData,
                      "accessToken"
                  )
                      ) {
                        const notion = new Client({
                          auth: documentData.accessToken,
                        });

                        if (userData?.pinCodeBlock) {
                          return notion.blocks
                              .update({
                                block_id: userData?.pinCodeBlock,
                                paragraph: {
                                  text: [
                                    {
                                      type: "text",
                                      text: {
                                        content:
                                          `Pin Code : ${userData?.pinCode}`,
                                      },
                                    },
                                  ],
                                },
                              })
                              .then((res) => {
                                return {
                                  success: true,
                                  pinCodeBlock: res.id,
                                };
                              })
                              .catch((error: NotionClientError) => {
                                functions.logger.error(
                                    "Error retrieving blocks:\n",
                                    error
                                );
                                throw new functions.https.HttpsError(
                                    "unknown",
                                    error.message,
                                    error
                                );
                              });
                        } else {
                          return notion.blocks.children
                              .append({
                                block_id: userData?.page,
                                children: [
                                  {
                                    object: "block",
                                    type: "paragraph",
                                    id: "",
                                    created_time: "",
                                    last_edited_time: "",
                                    has_children: false,
                                    paragraph: {
                                      text: [
                                        {
                                          type: "text",
                                          text: {
                                            content:
                                              `Pin Code : ${userData?.pinCode}`,
                                          },
                                          plain_text:
                                            `Pin Code : ${userData?.pinCode}`,
                                          annotations: {
                                            bold: false,
                                            italic: false,
                                            strikethrough: false,
                                            underline: false,
                                            code: false,
                                            color: "default",
                                          },
                                          href: undefined,
                                        },
                                      ],
                                    },
                                  },
                                ],
                              })
                              .then((res: any) => {
                                return {
                                  success: true,
                                  pinCodeBlock: res.results[0].id,
                                };
                              })
                              .catch((error: NotionClientError) => {
                                functions.logger.error(
                                    "Error retrieving blocks:\n",
                                    error
                                );
                                throw new functions.https.HttpsError(
                                    "unknown",
                                    error.message,
                                    error
                                );
                              });
                        }
                      } else {
                        throw new functions.https.HttpsError(
                            "failed-precondition",
                            "No token in doc"
                        );
                      }
                    });
              }
            });
      } else {
        throw new functions.https.HttpsError(
            "unauthenticated",
            "Not authenticated"
        );
      }
    });

/*
  for testing
  oneTimeAuth(
  {
    pinCode:"5k1341vm",
    uniqueUrl:"https://app.notion.coffee/w/espresso/99dea72b-7be5-465c-8981-edf3707f4089-1638024362762"
  }
  )
 */
export const oneTimeAuth = functions
    .region("europe-west3")
    .https.onCall((data, context) => {
      const pinCode = data.pinCode;
      const uniqueUrl = data.uniqueUrl;
      if (!pinCode || !uniqueUrl) {
        throw new functions.https.HttpsError(
            "failed-precondition",
            "Missing necessary inputs."
        );
      }

      if (uniqueUrl=="https://react-coffee-a2736.web.app/espresso/demo") {
        if (pinCode=="9tj421mn") {
          return {
            demo: true,
          };
        } else {
          throw new functions.https.HttpsError(
              "internal",
              "No matching documents."
          );
        }
      }

      return db.collection("users")
          .where("uniqueUrl", "==", uniqueUrl)
          .where("pinCode", "==", pinCode)
          .get()
          .then((snapshot) => {
            if (snapshot.empty) {
              functions.logger.info("No matching documents.");
              throw new functions.https.HttpsError(
                  "internal",
                  "No matching documents."
              );
            }

            if (snapshot.docs.length > 1) {
              functions.logger.info("Duplicated documents.");
              throw new functions.https.HttpsError(
                  "internal",
                  "More than one document"
              );
            }
            let responsePromise;
            snapshot.forEach((doc) => {
              functions.logger.info(
                  "found matching user document with uid",
                  doc.id);
              responsePromise = admin
                  .auth()
                  .createCustomToken(doc.id)
                  .then((customToken:string) => {
                    // Send token back to client
                    functions.logger.info(customToken);
                    return {token: customToken};
                  })
                  .catch((error) => {
                    functions.logger.error(
                        "Error creating custom token:",
                        error
                    );
                    throw new functions.https.HttpsError(
                        "internal",
                        "Error when creating custom token"
                    );
                  });
            });
            return responsePromise;
          });
    });
