import { combineReducers } from "redux";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NotionAuth from "./NotionAuth";
import Dashboard from "./Dashboard";
import Profile from "./Profile";

const rootReducer = combineReducers({
  SignIn,
  SignUp,
  NotionAuth,
  Dashboard,
  Profile,
});
export default rootReducer;
