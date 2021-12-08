import React, { useEffect } from "react";
import { connect } from "react-redux";
import Espresso from "./Espresso";
import { notionOAuthToken } from "../../../store/actions/NotionAuth";
import { getProfile, saveData } from "../../../store/actions/Profile";
import {
  generatePinCode,
  generateUniqueUrl,
} from "../../../store/actions/EmbeddedLink.js";
import { findPage, embeddedPinCode } from "../../../store/actions/Pages";
import { findDataBase } from "../../../store/actions/TaskDatabase";

const EspressoContainer = (props) => {
  return <Espresso {...props} />;
};

const mapStateToProps = ({
  NotionAuth,
  EmbeddedLink,
  Pages,
  TaskDatabase,
  Profile,
}) => {
  return {
    loading: NotionAuth?.loading,
    redirectedUrl: NotionAuth?.oauthUrl?.redirectUrl,
    response: NotionAuth?.response,
    error: NotionAuth?.error,
    uniqueLinkGenerated: EmbeddedLink?.uniqueLinkGenerated,
    pinCodeGenerated: EmbeddedLink?.pinCodeGenerated,
    embeddedLinkError: EmbeddedLink?.error,
    embeddedLinkResponse: EmbeddedLink?.response,
    databases: TaskDatabase?.databases,
    taskDatabaseError: TaskDatabase?.error,
    taskDatabaseResponse: TaskDatabase?.response,
    pages: Pages?.pages,
    pagesError: Pages?.error,
    pagesResponse: Pages?.response,
    user: Profile?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notionOAuthToken: (userData) => {
      dispatch(notionOAuthToken(userData));
    },
    generateUniqueUrl: (data) => {
      dispatch(generateUniqueUrl(data));
    },
    generatePinCode: (userData) => {
      dispatch(generatePinCode(userData));
    },
    findDataBase: (data) => {
      dispatch(findDataBase(data));
    },
    findPage: (userData) => {
      dispatch(findPage(userData));
    },
    getProfile: (data) => {
      dispatch(getProfile(data));
    },
    saveData: (data) => {
      dispatch(saveData(data));
    },
    embeddedPinCode: (data) => {
      dispatch(embeddedPinCode(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EspressoContainer);
