import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import MainApp from "./MainApp";
import SignUp from "../pages/Signup";
import ForgetPassword from "../pages/ForgetPassword";

export default function AppRouting() {
  // localStorage.removeItem("token");
  // localStorage.removeItem("userId");
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/forget-password">
            <ForgetPassword />
          </Route>
          <Route path="/" component={MainApp} />
        </Switch>
      </div>
    </Router>
  );
}
