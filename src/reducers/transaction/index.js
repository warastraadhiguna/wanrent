import {
  GET_TRANSACTION_LIST,
  GET_DETAIL_TRANSACTION,
  GET_DETAIL_TRANSACTION_BY_CODE,
  ADD_TRANSACTION,
  END_TRANSACTION,
  EDIT_TRANSACTION,
  DELETE_TRANSACTION,
} from "../../actions/transaction/TransactionAction";

const initialState = {
  getTransactionLoading: false,
  getTransactionResult: false,
  getTransactionError: false,

  getDetailTransactionLoading: false,
  getDetailTransactionResult: false,
  getDetailTransactionError: false,

  getDetailTransactionByCodeLoading: false,
  getDetailTransactionByCodeResult: false,
  getDetailTransactionByCodeError: false,

  addTransactionLoading: false,
  addTransactionResult: false,
  addTransactionError: false,

  editTransactionLoading: false,
  editTransactionResult: false,
  editTransactionError: false,

  endTransactionLoading: false,
  endTransactionResult: false,
  endTransactionError: false,

  deleteTransactionLoading: false,
  deleteTransactionResult: false,
  deleteTransactionError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TRANSACTION_LIST:
      return {
        ...state,
        getTransactionLoading: action.payload.loading,
        getTransactionResult: action.payload.data,
        getTransactionError: action.payload.errorMessage,
      };
    case GET_DETAIL_TRANSACTION:
      return {
        ...state,
        getDetailTransactionLoading: action.payload.loading,
        getDetailTransactionResult: action.payload.data,
        getDetailTransactionError: action.payload.errorMessage,
      };
    case GET_DETAIL_TRANSACTION_BY_CODE:
      return {
        ...state,
        getDetailTransactionByCodeLoading: action.payload.loading,
        getDetailTransactionByCodeResult: action.payload.data,
        getDetailTransactionByCodeError: action.payload.errorMessage,
      };
    case ADD_TRANSACTION:
      return {
        ...state,
        addTransactionLoading: action.payload.loading,
        addTransactionResult: action.payload.data,
        addTransactionError: action.payload.errorMessage,
      };
    case EDIT_TRANSACTION:
      return {
        ...state,
        editTransactionLoading: action.payload.loading,
        editTransactionResult: action.payload.data,
        editTransactionError: action.payload.errorMessage,
      };
    case END_TRANSACTION:
      return {
        ...state,
        endTransactionLoading: action.payload.loading,
        endTransactionResult: action.payload.data,
        endTransactionError: action.payload.errorMessage,
      };
    case DELETE_TRANSACTION:
      return {
        ...state,
        deleteTransactionLoading: action.payload.loading,
        deleteTransactionResult: action.payload.data,
        deleteTransactionError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
