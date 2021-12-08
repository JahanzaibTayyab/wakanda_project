import {
  GENERATE_PIN_CODE,
  GENERATE_PIN_CODE_SUCCESS,
  GENERATE_PIN_CODE_FAILURE,
  GENERATE_UNIQUE_URL,
  GENERATE_UNIQUE_URL_SUCCESS,
  GENERATE_UNIQUE_URL_FAILURE,
} from "../types";

const INIT_STATE = {
  pinCodeGenerated: false,
  uniqueLinkGenerated: false,
  response: null,
  error: null,
  loading: false,
};

const EmbeddedLink = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "RESET_EMBEDDED_LINK_STATES":
      return INIT_STATE;
    case GENERATE_PIN_CODE:
      return { ...state, loading: true };
    case GENERATE_PIN_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        pinCodeGenerated: true,
      };
    case GENERATE_PIN_CODE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case GENERATE_UNIQUE_URL:
      return { ...state, loading: true };
    case GENERATE_UNIQUE_URL_SUCCESS:
      return {
        ...state,
        loading: false,
        response: action.payload,
        uniqueLinkGenerated: true,
      };
    case GENERATE_UNIQUE_URL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
export default EmbeddedLink;
