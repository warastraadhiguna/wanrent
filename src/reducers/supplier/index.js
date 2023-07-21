import {
  GET_SUPPLIER_LIST,
  GET_DETAIL_SUPPLIER,
  ADD_SUPPLIER,
  EDIT_SUPPLIER,
  DELETE_SUPPLIER,
} from "../../actions/supplier/SupplierAction";

const initialState = {
  getSupplierLoading: false,
  getSupplierResult: false,
  getSupplierError: false,

  getDetailSupplierLoading: false,
  getDetailSupplierResult: false,
  getDetailSupplierError: false,

  addSupplierLoading: false,
  addSupplierResult: false,
  addSupplierError: false,

  editSupplierLoading: false,
  editSupplierResult: false,
  editSupplierError: false,

  deleteSupplierLoading: false,
  deleteSupplierResult: false,
  deleteSupplierError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SUPPLIER_LIST:
      return {
        ...state,
        getSupplierLoading: action.payload.loading,
        getSupplierResult: action.payload.data,
        getSupplierError: action.payload.errorMessage,
      };
    case GET_DETAIL_SUPPLIER:
      return {
        ...state,
        getDetailSupplierLoading: action.payload.loading,
        getDetailSupplierResult: action.payload.data,
        getDetailSupplierError: action.payload.errorMessage,
      };
    case ADD_SUPPLIER:
      return {
        ...state,
        addSupplierLoading: action.payload.loading,
        addSupplierResult: action.payload.data,
        addSupplierError: action.payload.errorMessage,
      };
    case EDIT_SUPPLIER:
      return {
        ...state,
        editSupplierLoading: action.payload.loading,
        editSupplierResult: action.payload.data,
        editSupplierError: action.payload.errorMessage,
      };
    case DELETE_SUPPLIER:
      return {
        ...state,
        deleteSupplierLoading: action.payload.loading,
        deleteSupplierResult: action.payload.data,
        deleteSupplierError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
