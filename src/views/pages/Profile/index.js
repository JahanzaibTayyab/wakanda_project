import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";

import { saveData, getProfile } from "../../../store/actions/Profile";
import { notionOAuthUlr } from "../../../store/actions/NotionAuth";

const ProfileContainer = (props) => {
  return <Profile {...props} />;
};

const mapStateToProps = ({ NotionAuth, Profile }) => {
  return {
    loading: NotionAuth?.loading,
    redirectedUrl: NotionAuth?.oauthUrl?.redirectUrl,
    response: NotionAuth?.response,
    error: NotionAuth?.error,
    user: Profile?.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveData: (userData) => {
      dispatch(saveData(userData));
    },
    notionOAuthUlr: (userData) => {
      dispatch(notionOAuthUlr(userData));
    },
    getProfile: (userData) => {
      dispatch(getProfile(userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
