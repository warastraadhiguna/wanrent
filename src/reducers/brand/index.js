import {
  GET_BRAND_LIST,
  GET_DETAIL_BRAND,
  ADD_BRAND,
  EDIT_BRAND,
  DELETE_BRAND,
} from "../../actions/brand/BrandAction";

const initialState = {
  getBrandLoading: false,
  getBrandResult: false,
  getBrandError: false,

  getDetailBrandLoading: false,
  getDetailBrandResult: false,
  getDetailBrandError: false,

  addBrandLoading: false,
  addBrandResult: false,
  addBrandError: false,

  editBrandLoading: false,
  editBrandResult: false,
  editBrandError: false,

  deleteBrandLoading: false,
  deleteBrandResult: false,
  deleteBrandError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_BRAND_LIST:
      return {
        ...state,
        getBrandLoading: action.payload.loading,
        getBrandResult: action.payload.data,
        getBrandError: action.payload.errorMessage,
      };
    case GET_DETAIL_BRAND:
      return {
        ...state,
        getDetailBrandLoading: action.payload.loading,
        getDetailBrandResult: action.payload.data,
        getDetailBrandError: action.payload.errorMessage,
      };
    case ADD_BRAND:
      return {
        ...state,
        addBrandLoading: action.payload.loading,
        addBrandResult: action.payload.data,
        addBrandError: action.payload.errorMessage,
      };
    case EDIT_BRAND:
      return {
        ...state,
        editBrandLoading: action.payload.loading,
        editBrandResult: action.payload.data,
        editBrandError: action.payload.errorMessage,
      };
    case DELETE_BRAND:
      return {
        ...state,
        deleteBrandLoading: action.payload.loading,
        deleteBrandResult: action.payload.data,
        deleteBrandError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
