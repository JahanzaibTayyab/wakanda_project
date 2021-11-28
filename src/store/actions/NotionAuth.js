import {
  NOTION_OAUTH_URL,
  NOTION_OAUTH_URL_SUCCESS,
  NOTION_OAUTH_URL_FAILURE,
  NOTION_OAUTH_TOKEN,
  NOTION_OAUTH_TOKEN_SUCCESS,
  NOTION_OAUTH_TOKEN_FAILURE,
} from "../types";

export const resetNotionAuthStates = () => ({
  type: "RESET_NOTION_AUTH_STATES",
});

export const notionOAuthUlr = (data) => {
  return {
    type: NOTION_OAUTH_URL,
    payload: data,
  };
};
export const getNotionOAuthUlrSuccess = (response) => {
  return {
    type: NOTION_OAUTH_URL_SUCCESS,
    payload: response,
  };
};
export const getNotionOAuthUlrFailure = (response) => {
  return {
    type: NOTION_OAUTH_URL_FAILURE,
    payload: response,
  };
};

export const notionOAuthToken = (data) => {
  return {
    type: NOTION_OAUTH_TOKEN,
    payload: data,
  };
};

export const getNotionOAuthTokenSuccess = (response) => {
  return {
    type: NOTION_OAUTH_TOKEN_SUCCESS,
    payload: response,
  };
};

export const getNotionOAuthTokenFailure = (response) => {
  return {
    type: NOTION_OAUTH_TOKEN_FAILURE,
    payload: response,
  };
};
