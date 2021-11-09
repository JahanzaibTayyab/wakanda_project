import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import {
  reSendEmail,
  resetSignInStates,
  signIn,
} from "../../../store/actions/SignIn";

const LoginContainer = (props) => {
  return <Login {...props} />;
};

const mapStateToProps = ({ SignUp, SignIn }) => {
  return {
    emailSent: SignIn?.emailSent,
    signInResponse: SignIn?.response,
    user: SignIn?.user,
    loading: SignIn?.loading,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signInUser: (userData) => {
      dispatch(signIn(userData));
    },
    reSendEmail: (userData) => {
      dispatch(reSendEmail(userData));
    },
    resetSignInStates: () => {
      dispatch(resetSignInStates());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
