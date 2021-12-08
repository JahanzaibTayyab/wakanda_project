import { combineReducers } from "redux";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import NotionAuth from "./NotionAuth";
import EmbeddedLink from "./EmbeddedLink";
import Pages from "./Pages";
import TaskDatabase from "./TaskDatabase";
import Profile from "./Profile";

const rootReducer = combineReducers({
  SignIn,
  SignUp,
  NotionAuth,
  EmbeddedLink,
  Pages,
  TaskDatabase,
  Profile,
});
export default rootReducer;
