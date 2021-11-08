import { combineReducers } from "redux";
import SignIn from "./SignIn";
import Profile from "./Profile";
import SignUp from "./SignUp";

const rootReducer = combineReducers({
  SignIn,
  Profile,
  SignUp,
});
export default rootReducer;
