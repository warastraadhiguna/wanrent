import {
  GET_PRICE_LIST,
  GET_DETAIL_PRICE,
  ADD_PRICE,
  EDIT_PRICE,
  DELETE_PRICE,
} from "../../actions/price/PriceAction";

const initialState = {
  getPriceLoading: false,
  getPriceResult: false,
  getPriceError: false,

  getDetailPriceLoading: false,
  getDetailPriceResult: false,
  getDetailPriceError: false,

  addPriceLoading: false,
  addPriceResult: false,
  addPriceError: false,

  editPriceLoading: false,
  editPriceResult: false,
  editPriceError: false,

  deletePriceLoading: false,
  deletePriceResult: false,
  deletePriceError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PRICE_LIST:
      return {
        ...state,
        getPriceLoading: action.payload.loading,
        getPriceResult: action.payload.data,
        getPriceError: action.payload.errorMessage,
      };
    case GET_DETAIL_PRICE:
      return {
        ...state,
        getDetailPriceLoading: action.payload.loading,
        getDetailPriceResult: action.payload.data,
        getDetailPriceError: action.payload.errorMessage,
      };
    case ADD_PRICE:
      return {
        ...state,
        addPriceLoading: action.payload.loading,
        addPriceResult: action.payload.data,
        addPriceError: action.payload.errorMessage,
      };
    case EDIT_PRICE:
      return {
        ...state,
        editPriceLoading: action.payload.loading,
        editPriceResult: action.payload.data,
        editPriceError: action.payload.errorMessage,
      };
    case DELETE_PRICE:
      return {
        ...state,
        deletePriceLoading: action.payload.loading,
        deletePriceResult: action.payload.data,
        deletePriceError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
