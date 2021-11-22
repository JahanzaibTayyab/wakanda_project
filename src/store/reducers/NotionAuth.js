import {
  NOTION_OAUTH_URL,
  NOTION_OAUTH_URL_SUCCESS,
  NOTION_OAUTH_URL_FAILURE,
  NOTION_OAUTH_TOKEN,
  NOTION_OAUTH_TOKEN_SUCCESS,
  NOTION_OAUTH_TOKEN_FAILURE,
} from "../types";
const INIT_STATE = {
  oauthUrl: null,
  response: null,
  error: null,
  loading: false,
};

const NotionAuth = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "RESET_NOTION_AUTH_STATES":
      return INIT_STATE;
    case NOTION_OAUTH_URL:
      return { ...state, loading: true };
    case NOTION_OAUTH_URL_SUCCESS:
      return { ...state, loading: false, oauthUrl: action.payload };
    case NOTION_OAUTH_URL_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case NOTION_OAUTH_TOKEN:
      return { ...state, loading: true };
    case NOTION_OAUTH_TOKEN_SUCCESS:
      return { ...state, loading: false, response: action.payload };
    case NOTION_OAUTH_TOKEN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return { ...state };
  }
};
export default NotionAuth;
