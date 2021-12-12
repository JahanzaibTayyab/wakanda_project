import { createStandaloneToast } from "@chakra-ui/react";
import {
  FIND_PAGE,
  FIND_PAGE_FAILURE,
  FIND_PAGE_SUCCESS,
  EMBEDDED_PIN_CODE,
  EMBEDDED_PIN_CODE_SUCCESS,
  EMBEDDED_PIN_CODE_FAILURE,
} from "../types";

const toast = createStandaloneToast();

const INIT_STATE = {
  pages: null,
  response: null,
  error: null,
  loading: false,
};

const Pages = (state = INIT_STATE, action) => {
  switch (action.type) {
    case "RESET_PAGES_STATES":
      return INIT_STATE;
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
      if (action.payload.payload?.fromDashboard) {
      }
      toast({
        position: "bottom-right",
        title: "Embedded Pin Code Failure",
        description: action.payload.message,
        status: "error",
        isClosable: true,
      });
      return { ...state, loading: false, error: action.payload.message };
    case EMBEDDED_PIN_CODE:
      return { ...state, loading: true, error: null };
    case EMBEDDED_PIN_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        pinCodeEmbedded:action.payload.success,
        response: action.payload,
      };
    case EMBEDDED_PIN_CODE_FAILURE:
      toast({
        position: "bottom-right",
        title: "Embedded Pin Code Failure",
        description: action.payload.error.message,
        status: "error",
        isClosable: true,
      });
      return { ...state,pinCodeEmbedded:false, loading: false, error: action.payload.error.message };
    default:
      return { ...state };
  }
};
export default Pages;
