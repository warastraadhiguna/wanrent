import {
  GET_PERSONAL_DEBT_LIST,
  GET_DETAIL_PERSONAL_DEBT,
  ADD_PERSONAL_DEBT,
  EDIT_PERSONAL_DEBT,
  DELETE_PERSONAL_DEBT,
} from "../../actions/personalDebt/PersonalDebtAction";

const initialState = {
  getPersonalDebtLoading: false,
  getPersonalDebtResult: false,
  getPersonalDebtError: false,

  getDetailPersonalDebtLoading: false,
  getDetailPersonalDebtResult: false,
  getDetailPersonalDebtError: false,

  addPersonalDebtLoading: false,
  addPersonalDebtResult: false,
  addPersonalDebtError: false,

  editPersonalDebtLoading: false,
  editPersonalDebtResult: false,
  editPersonalDebtError: false,

  deletePersonalDebtLoading: false,
  deletePersonalDebtResult: false,
  deletePersonalDebtError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PERSONAL_DEBT_LIST:
      return {
        ...state,
        getPersonalDebtLoading: action.payload.loading,
        getPersonalDebtResult: action.payload.data,
        getPersonalDebtError: action.payload.errorMessage,
      };
    case GET_DETAIL_PERSONAL_DEBT:
      return {
        ...state,
        getDetailPersonalDebtLoading: action.payload.loading,
        getDetailPersonalDebtResult: action.payload.data,
        getDetailPersonalDebtError: action.payload.errorMessage,
      };
    case ADD_PERSONAL_DEBT:
      return {
        ...state,
        addPersonalDebtLoading: action.payload.loading,
        addPersonalDebtResult: action.payload.data,
        addPersonalDebtError: action.payload.errorMessage,
      };
    case EDIT_PERSONAL_DEBT:
      return {
        ...state,
        editPersonalDebtLoading: action.payload.loading,
        editPersonalDebtResult: action.payload.data,
        editPersonalDebtError: action.payload.errorMessage,
      };
    case DELETE_PERSONAL_DEBT:
      return {
        ...state,
        deletePersonalDebtLoading: action.payload.loading,
        deletePersonalDebtResult: action.payload.data,
        deletePersonalDebtError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
