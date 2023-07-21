import { GET_TYPE_LIST, GET_DETAIL_TYPE } from "../../actions/type/TypeAction";

const initialState = {
  getTypeLoading: false,
  getTypeResult: false,
  getTypeError: false,

  getDetailTypeLoading: false,
  getDetailTypeResult: false,
  getDetailTypeError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TYPE_LIST:
      return {
        ...state,
        getTypeLoading: action.payload.loading,
        getTypeResult: action.payload.data,
        getTypeError: action.payload.errorMessage,
      };
    case GET_DETAIL_TYPE:
      return {
        ...state,
        getDetailTypeLoading: action.payload.loading,
        getDetailTypeResult: action.payload.data,
        getDetailTypeError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
