import {
  GET_OWNERSHIP_LIST,
  GET_DETAIL_OWNERSHIP,
  ADD_OWNERSHIP,
  EDIT_OWNERSHIP,
  DELETE_OWNERSHIP,
} from "../../actions/ownership/OwnershipAction";

const initialState = {
  getOwnershipLoading: false,
  getOwnershipResult: false,
  getOwnershipError: false,

  getDetailOwnershipLoading: false,
  getDetailOwnershipResult: false,
  getDetailOwnershipError: false,

  addOwnershipLoading: false,
  addOwnershipResult: false,
  addOwnershipError: false,

  editOwnershipLoading: false,
  editOwnershipResult: false,
  editOwnershipError: false,

  deleteOwnershipLoading: false,
  deleteOwnershipResult: false,
  deleteOwnershipError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_OWNERSHIP_LIST:
      return {
        ...state,
        getOwnershipLoading: action.payload.loading,
        getOwnershipResult: action.payload.data,
        getOwnershipError: action.payload.errorMessage,
      };
    case GET_DETAIL_OWNERSHIP:
      return {
        ...state,
        getDetailOwnershipLoading: action.payload.loading,
        getDetailOwnershipResult: action.payload.data,
        getDetailOwnershipError: action.payload.errorMessage,
      };
    case ADD_OWNERSHIP:
      return {
        ...state,
        addOwnershipLoading: action.payload.loading,
        addOwnershipResult: action.payload.data,
        addOwnershipError: action.payload.errorMessage,
      };
    case EDIT_OWNERSHIP:
      return {
        ...state,
        editOwnershipLoading: action.payload.loading,
        editOwnershipResult: action.payload.data,
        editOwnershipError: action.payload.errorMessage,
      };
    case DELETE_OWNERSHIP:
      return {
        ...state,
        deleteOwnershipLoading: action.payload.loading,
        deleteOwnershipResult: action.payload.data,
        deleteOwnershipError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
