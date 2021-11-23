import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  notionOAuthToken,
  notionOAuthUlr,
} from "../../../store/actions/NotionAuth";
import { saveData, getProfile } from "../../../store/actions/Profile";
import {
  generatePinCode,
  generateUniqueUrl,
  findDataBase,
  findPage,
} from "../../../store/actions/Dashboard";

const ProfileContainer = (props) => {
  return <Profile {...props} />;
};

const mapStateToProps = ({ NotionAuth, Dashboard, Profile }) => {
  return {
    loading: NotionAuth?.loading,
    redirectedUrl: NotionAuth?.oauthUrl?.redirectUrl,
    response: NotionAuth?.response,
    error: NotionAuth?.error,
    uniqueLinkGenerated: Dashboard?.uniqueLinkGenerated,
    pinCodeGenerated: Dashboard?.pinCodeGenerated,
    dashboardError: Dashboard?.error,
    dashboardResponse: Dashboard?.response,
    databases: Dashboard?.databases,
    pages: Dashboard?.pages,
    user: Profile?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    notionOAuthUlr: (userData) => {
      dispatch(notionOAuthUlr(userData));
    },
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
    saveData: (userData) => {
      dispatch(saveData(userData));
    },
    getProfile: (userData) => {
      dispatch(getProfile(userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
