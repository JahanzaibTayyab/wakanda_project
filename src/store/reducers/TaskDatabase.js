import {
  FIND_DATABASE,
  FIND_DATABASE_SUCCESS,
  FIND_DATABASE_FAILURE,
} from "../types";

const INIT_STATE = {
  pages: null,
  response: null,
  error: null,
  loading: false,
};

const TaskDatabase = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "RESET_TASK_DATABASE_STATES":
      return INIT_STATE;
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
      return { ...state, loading: false, error: action.payload.message };
    default:
      return { ...state };
  }
};
export default TaskDatabase;
