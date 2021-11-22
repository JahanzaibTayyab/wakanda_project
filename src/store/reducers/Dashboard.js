import {
  GENERATE_PIN_CODE,
  GENERATE_PIN_CODE_SUCCESS,
  GENERATE_PIN_CODE_FAILURE,
  GENERATE_UNIQUE_URL,
  GENERATE_UNIQUE_URL_SUCCESS,
  GENERATE_UNIQUE_URL_FAILURE,
  FIND_DATABASE_FAILURE,
  FIND_DATABASE_SUCCESS,
  FIND_DATABASE,
  FIND_PAGE,
  FIND_PAGE_FAILURE,
  FIND_PAGE_SUCCESS,
} from "../types";

const INIT_STATE = {
  pinCodeGenerated: false,
  uniqueLinkGenerated: false,
  databases: null,
  pages: null,
  response: null,
  error: null,
  loading: false,
};

const Dashboard = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "RESET_PREPARING_STATES":
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
    case FIND_PAGE:
      return { ...state, loading: true };
    case FIND_PAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        pages: action.payload.pages,
        response: action.payload,
      };
    case FIND_PAGE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case FIND_DATABASE:
      return { ...state, loading: true };
    case FIND_DATABASE_SUCCESS:
      return {
        ...state,
        loading: false,
        databases: action.payload.databases,
        response: action.payload,
      };
    case FIND_DATABASE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
export default Dashboard;
