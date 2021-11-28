import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../pages/Login";
import BeforeStart from "../pages/OnBoarding/BeforeStart";
import Notion1 from "../pages/OnBoarding/Notion1";
import Preparing from "../pages/OnBoarding/Preparing";
import MainApp from "./MainApp";
import SignUp from "../pages/Signup";
import ForgetPassword from "../pages/ForgetPassword";
import ResetPassword from "../pages/ForgetPassword/ResetPasswordPage";

export default function AppRouting() {
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
          <Route path="/before">
            <BeforeStart />
          </Route>
          <Route path="/notion1">
            <Notion1 />
          </Route>
          <Route path="/onboard">
            <Preparing />
          </Route>
          <Route path="/forget-password">
            <ForgetPassword />
          </Route>
          <Route path="/reset-password">
            <ResetPassword />
          </Route>
          <Route path="/" component={MainApp} />
        </Switch>
      </div>
    </Router>
  );
}
