import {
  GET_CUSTOMER_LIST,
  GET_DETAIL_CUSTOMER,
  ADD_CUSTOMER,
  EDIT_CUSTOMER,
  DELETE_CUSTOMER,
} from "../../actions/customer/CustomerAction";

const initialState = {
  getCustomerLoading: false,
  getCustomerResult: false,
  getCustomerError: false,

  getDetailCustomerLoading: false,
  getDetailCustomerResult: false,
  getDetailCustomerError: false,

  addCustomerLoading: false,
  addCustomerResult: false,
  addCustomerError: false,

  editCustomerLoading: false,
  editCustomerResult: false,
  editCustomerError: false,

  deleteCustomerLoading: false,
  deleteCustomerResult: false,
  deleteCustomerError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOMER_LIST:
      return {
        ...state,
        getCustomerLoading: action.payload.loading,
        getCustomerResult: action.payload.data,
        getCustomerError: action.payload.errorMessage,
      };
    case GET_DETAIL_CUSTOMER:
      return {
        ...state,
        getDetailCustomerLoading: action.payload.loading,
        getDetailCustomerResult: action.payload.data,
        getDetailCustomerError: action.payload.errorMessage,
      };
    case ADD_CUSTOMER:
      return {
        ...state,
        addCustomerLoading: action.payload.loading,
        addCustomerResult: action.payload.data,
        addCustomerError: action.payload.errorMessage,
      };
    case EDIT_CUSTOMER:
      return {
        ...state,
        editCustomerLoading: action.payload.loading,
        editCustomerResult: action.payload.data,
        editCustomerError: action.payload.errorMessage,
      };
    case DELETE_CUSTOMER:
      return {
        ...state,
        deleteCustomerLoading: action.payload.loading,
        deleteCustomerResult: action.payload.data,
        deleteCustomerError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
