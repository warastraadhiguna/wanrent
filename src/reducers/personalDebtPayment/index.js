import {
  GET_PERSONAL_DEBT_PAYMENT_LIST,
  GET_DETAIL_PERSONAL_DEBT_PAYMENT,
  ADD_PERSONAL_DEBT_PAYMENT,
  EDIT_PERSONAL_DEBT_PAYMENT,
  DELETE_PERSONAL_DEBT_PAYMENT,
} from "../../actions/personalDebtPayment/PersonalDebtPaymentAction";

const initialState = {
  getPersonalDebtPaymentLoading: false,
  getPersonalDebtPaymentResult: false,
  getPersonalDebtPaymentError: false,

  getDetailPersonalDebtPaymentLoading: false,
  getDetailPersonalDebtPaymentResult: false,
  getDetailPersonalDebtPaymentError: false,

  addPersonalDebtPaymentLoading: false,
  addPersonalDebtPaymentResult: false,
  addPersonalDebtPaymentError: false,

  editPersonalDebtPaymentLoading: false,
  editPersonalDebtPaymentResult: false,
  editPersonalDebtPaymentError: false,

  deletePersonalDebtPaymentLoading: false,
  deletePersonalDebtPaymentResult: false,
  deletePersonalDebtPaymentError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PERSONAL_DEBT_PAYMENT_LIST:
      return {
        ...state,
        getPersonalDebtPaymentLoading: action.payload.loading,
        getPersonalDebtPaymentResult: action.payload.data,
        getPersonalDebtPaymentError: action.payload.errorMessage,
      };
    case GET_DETAIL_PERSONAL_DEBT_PAYMENT:
      return {
        ...state,
        getDetailPersonalDebtPaymentLoading: action.payload.loading,
        getDetailPersonalDebtPaymentResult: action.payload.data,
        getDetailPersonalDebtPaymentError: action.payload.errorMessage,
      };
    case ADD_PERSONAL_DEBT_PAYMENT:
      return {
        ...state,
        addPersonalDebtPaymentLoading: action.payload.loading,
        addPersonalDebtPaymentResult: action.payload.data,
        addPersonalDebtPaymentError: action.payload.errorMessage,
      };
    case EDIT_PERSONAL_DEBT_PAYMENT:
      return {
        ...state,
        editPersonalDebtPaymentLoading: action.payload.loading,
        editPersonalDebtPaymentResult: action.payload.data,
        editPersonalDebtPaymentError: action.payload.errorMessage,
      };
    case DELETE_PERSONAL_DEBT_PAYMENT:
      return {
        ...state,
        deletePersonalDebtPaymentLoading: action.payload.loading,
        deletePersonalDebtPaymentResult: action.payload.data,
        deletePersonalDebtPaymentError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
