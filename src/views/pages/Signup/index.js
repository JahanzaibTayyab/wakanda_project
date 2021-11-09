import React from "react";
import { connect } from "react-redux";
import Signup from "./Signup";
import {
  signUp,
  signUpSuccess,
  signUpFailure,
  getAlreadyEmail,
} from "../../../store/actions/SignUp";

const SignupContainer = (props) => {
  return <Signup {...props} />;
};

const mapStateToProps = ({ SignUp }) => {
  return {
    userToken: SignUp?.response?.token,
    loading: SignUp?.loading,
    emailAlreadyTaken: SignUp?.emailTaken,
    signUpResponse: SignUp?.response,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (userData) => {
      dispatch(signUp(userData));
    },
    signUpSuccess: (userData) => {
      dispatch(signUpSuccess(userData));
    },
    signUpFailure: (userData) => {
      dispatch(signUpFailure(userData));
    },
    getAlreadyEmail: (userData) => {
      dispatch(getAlreadyEmail(userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
