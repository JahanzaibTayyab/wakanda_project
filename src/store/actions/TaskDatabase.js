import {
  FIND_DATABASE,
  FIND_DATABASE_SUCCESS,
  FIND_DATABASE_FAILURE,
} from "../types";

export const resetTaskDataBaseStates = () => ({
  type: "RESET_TASK_DATABASE_STATES",
});

export const findDataBase = (data) => ({
  type: FIND_DATABASE,
  payload: data,
});

export const findDataBaseSuccess = (data) => ({
  type: FIND_DATABASE_SUCCESS,
  payload: data,
});

export const findDataBaseFailure = (error) => ({
  type: FIND_DATABASE_FAILURE,
  payload: error,
});
