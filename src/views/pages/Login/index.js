import React from "react";
import { connect } from "react-redux";
import Login from "./Login";
import { reSendEmail } from "../../../store/actions/SignIn";

const LoginContainer = (props) => {
  return <Login {...props} />;
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
    reSendEmail: (userData) => {
      dispatch(reSendEmail(userData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
