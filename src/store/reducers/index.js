import { combineReducers } from "redux";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const rootReducer = combineReducers({
  SignIn,
  SignUp,
});
export default rootReducer;
