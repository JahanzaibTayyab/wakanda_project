import React from "react";
import { connect } from "react-redux";
import { Redirect, Route, useLocation, useHistory } from "react-router-dom";
import RctDefaultLayout from "./DefaultLayout";
import AppSignIn from "../pages/Login";
import { LocalStorage } from "../../constants/LocalStorage";
import { userData } from "../../store/actions/SignIn";
import { useAuth } from "../../contexts/AuthContext";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const InitialPath = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => <Component {...props} />} />
);

const MainApp = (props) => {
  const { currentUser } = useAuth();
  const { location, match, user } = props;
  const history = useHistory();
  const query = useQuery();
  if (localStorage.getItem(LocalStorage.TOKEN) == null) {
    if (location.pathname !== "/login") {
      if (query.get("mode") === "verifyEmail") {
        return <Redirect to={`/login${location.search}`} />;
      } else if (query.get("mode") === "resetPassword") {
        return <Redirect to={`/reset-password${location.search}`} />;
      } else {
        return <Redirect to={"/login"} />;
      }
    }
  } else if (location.pathname === "/") {
    if (currentUser) {
      props.userData({ user: currentUser, history });
    }
  }
  const defaultPath = `${match.url}app`;
  return (
    <>
      <InitialPath
        path={defaultPath}
        authUser={user}
        component={RctDefaultLayout}
      />
      <Route path="/login" component={AppSignIn} />
    </>
  );
};
const mapStateToProps = ({ SignIn }) => {
  const { user } = SignIn;
  return { user };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userData: (data) => {
      dispatch(userData(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainApp);
