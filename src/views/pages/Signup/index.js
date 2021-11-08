import React from "react";
import { connect } from "react-redux";
import Signup from "./Signup";
import { signUp } from "../../../store/actions/SignUp";

const SignupContainer = (props) => {
  return <Signup {...props} />;
};

const mapStateToProps = ({ SignUp }) => {
  return {
    userToken: SignUp?.response?.token,
    loading: SignUp?.loading,
    emailAlreadyTaken: SignUp?.emailTaken,
    signInResponse: SignUp?.response,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (userData) => {
      dispatch(signUp(userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
