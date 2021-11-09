import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import {
  reSendEmail,
  reSendEmailSuccess,
  reSendEmailFailure,
  resetSignInStates,
  signIn,
  signInSuccess,
  signInFailure,
  googleSignIn,
  googleSignInSuccess,
  googleSignInFailure,
  facebookSignIn,
  facebookSignInSuccess,
  facebookSignInFailure,
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
    signInSuccess: (userData) => {
      dispatch(signInSuccess(userData));
    },
    signInFailure: (userData) => {
      dispatch(signInFailure(userData));
    },
    reSendEmail: (userData) => {
      dispatch(reSendEmail(userData));
    },
    reSendEmailSuccess: (userData) => {
      dispatch(reSendEmailSuccess(userData));
    },
    reSendEmailFailure: (userData) => {
      dispatch(reSendEmailFailure(userData));
    },
    resetSignInStates: () => {
      dispatch(resetSignInStates());
    },
    googleSignIn: (data) => {
      dispatch(googleSignIn(data));
    },
    googleSignInSuccess: (data) => {
      dispatch(googleSignInSuccess(data));
    },
    googleSignInFailure: (data) => {
      dispatch(googleSignInFailure(data));
    },
    facebookSignIn: (data) => {
      dispatch(facebookSignIn(data));
    },
    facebookSignInSuccess: (data) => {
      dispatch(facebookSignInSuccess(data));
    },
    facebookSignInFailure: (data) => {
      dispatch(facebookSignInFailure(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
