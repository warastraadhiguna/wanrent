import {
  GET_PAYMENT_LIST,
  GET_DETAIL_PAYMENT,
  ADD_PAYMENT,
  EDIT_PAYMENT,
  DELETE_PAYMENT,
} from "../../actions/payment/PaymentAction";

const initialState = {
  getPaymentLoading: false,
  getPaymentResult: false,
  getPaymentError: false,

  getDetailPaymentLoading: false,
  getDetailPaymentResult: false,
  getDetailPaymentError: false,

  addPaymentLoading: false,
  addPaymentResult: false,
  addPaymentError: false,

  editPaymentLoading: false,
  editPaymentResult: false,
  editPaymentError: false,

  deletePaymentLoading: false,
  deletePaymentResult: false,
  deletePaymentError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PAYMENT_LIST:
      return {
        ...state,
        getPaymentLoading: action.payload.loading,
        getPaymentResult: action.payload.data,
        getPaymentError: action.payload.errorMessage,
      };
    case GET_DETAIL_PAYMENT:
      return {
        ...state,
        getDetailPaymentLoading: action.payload.loading,
        getDetailPaymentResult: action.payload.data,
        getDetailPaymentError: action.payload.errorMessage,
      };
    case ADD_PAYMENT:
      return {
        ...state,
        addPaymentLoading: action.payload.loading,
        addPaymentResult: action.payload.data,
        addPaymentError: action.payload.errorMessage,
      };
    case EDIT_PAYMENT:
      return {
        ...state,
        editPaymentLoading: action.payload.loading,
        editPaymentResult: action.payload.data,
        editPaymentError: action.payload.errorMessage,
      };
    case DELETE_PAYMENT:
      return {
        ...state,
        deletePaymentLoading: action.payload.loading,
        deletePaymentResult: action.payload.data,
        deletePaymentError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
