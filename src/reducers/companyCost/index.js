import {
  GET_COMPANY_COST_LIST,
  GET_DETAIL_COMPANY_COST,
  ADD_COMPANY_COST,
  EDIT_COMPANY_COST,
  DELETE_COMPANY_COST,
} from "../../actions/companyCost/CompanyCostAction";

const initialState = {
  getCompanyCostLoading: false,
  getCompanyCostResult: false,
  getCompanyCostError: false,

  getDetailCompanyCostLoading: false,
  getDetailCompanyCostResult: false,
  getDetailCompanyCostError: false,

  addCompanyCostLoading: false,
  addCompanyCostResult: false,
  addCompanyCostError: false,

  editCompanyCostLoading: false,
  editCompanyCostResult: false,
  editCompanyCostError: false,

  deleteCompanyCostLoading: false,
  deleteCompanyCostResult: false,
  deleteCompanyCostError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COMPANY_COST_LIST:
      return {
        ...state,
        getCompanyCostLoading: action.payload.loading,
        getCompanyCostResult: action.payload.data,
        getCompanyCostError: action.payload.errorMessage,
      };
    case GET_DETAIL_COMPANY_COST:
      return {
        ...state,
        getDetailCompanyCostLoading: action.payload.loading,
        getDetailCompanyCostResult: action.payload.data,
        getDetailCompanyCostError: action.payload.errorMessage,
      };
    case ADD_COMPANY_COST:
      return {
        ...state,
        addCompanyCostLoading: action.payload.loading,
        addCompanyCostResult: action.payload.data,
        addCompanyCostError: action.payload.errorMessage,
      };
    case EDIT_COMPANY_COST:
      return {
        ...state,
        editCompanyCostLoading: action.payload.loading,
        editCompanyCostResult: action.payload.data,
        editCompanyCostError: action.payload.errorMessage,
      };
    case DELETE_COMPANY_COST:
      return {
        ...state,
        deleteCompanyCostLoading: action.payload.loading,
        deleteCompanyCostResult: action.payload.data,
        deleteCompanyCostError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
