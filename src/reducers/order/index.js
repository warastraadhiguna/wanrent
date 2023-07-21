import {
  GET_ORDER_LIST,
  GET_DETAIL_ORDER,
  ADD_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
} from "../../actions/order/OrderAction";

const initialState = {
  getOrderLoading: false,
  getOrderResult: false,
  getOrderError: false,

  getDetailOrderLoading: false,
  getDetailOrderResult: false,
  getDetailOrderError: false,

  addOrderLoading: false,
  addOrderResult: false,
  addOrderError: false,

  editOrderLoading: false,
  editOrderResult: false,
  editOrderError: false,

  deleteOrderLoading: false,
  deleteOrderResult: false,
  deleteOrderError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ORDER_LIST:
      return {
        ...state,
        getOrderLoading: action.payload.loading,
        getOrderResult: action.payload.data,
        getOrderError: action.payload.errorMessage,
      };
    case GET_DETAIL_ORDER:
      return {
        ...state,
        getDetailOrderLoading: action.payload.loading,
        getDetailOrderResult: action.payload.data,
        getDetailOrderError: action.payload.errorMessage,
      };
    case ADD_ORDER:
      return {
        ...state,
        addOrderLoading: action.payload.loading,
        addOrderResult: action.payload.data,
        addOrderError: action.payload.errorMessage,
      };
    case EDIT_ORDER:
      return {
        ...state,
        editOrderLoading: action.payload.loading,
        editOrderResult: action.payload.data,
        editOrderError: action.payload.errorMessage,
      };
    case DELETE_ORDER:
      return {
        ...state,
        deleteOrderLoading: action.payload.loading,
        deleteOrderResult: action.payload.data,
        deleteOrderError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
