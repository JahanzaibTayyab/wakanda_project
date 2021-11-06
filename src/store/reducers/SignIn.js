import { SIGN_IN, SIGN_IN_SUCCESS, SIGN_IN_FAILURE } from "../types";

const INIT_STATE = {
  user: {},
  response: "",
  loading: false
};

const SignIn = (state = INIT_STATE, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        user: action.payload,
        loading: true
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        response: action.payload,
        loading: false
      };
    case SIGN_IN_FAILURE:
      return {
        ...state,
        response: action.payload,
        loading: false
      };
    default:
      return state;
  }
};
export default SignIn;
