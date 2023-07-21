import {
  GET_COST_LIST,
  GET_DETAIL_COST,
  ADD_COST,
  EDIT_COST,
  DELETE_COST,
} from "../../actions/cost/CostAction";

const initialState = {
  getCostLoading: false,
  getCostResult: false,
  getCostError: false,

  getDetailCostLoading: false,
  getDetailCostResult: false,
  getDetailCostError: false,

  addCostLoading: false,
  addCostResult: false,
  addCostError: false,

  editCostLoading: false,
  editCostResult: false,
  editCostError: false,

  deleteCostLoading: false,
  deleteCostResult: false,
  deleteCostError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_COST_LIST:
      return {
        ...state,
        getCostLoading: action.payload.loading,
        getCostResult: action.payload.data,
        getCostError: action.payload.errorMessage,
      };
    case GET_DETAIL_COST:
      return {
        ...state,
        getDetailCostLoading: action.payload.loading,
        getDetailCostResult: action.payload.data,
        getDetailCostError: action.payload.errorMessage,
      };
    case ADD_COST:
      return {
        ...state,
        addCostLoading: action.payload.loading,
        addCostResult: action.payload.data,
        addCostError: action.payload.errorMessage,
      };
    case EDIT_COST:
      return {
        ...state,
        editCostLoading: action.payload.loading,
        editCostResult: action.payload.data,
        editCostError: action.payload.errorMessage,
      };
    case DELETE_COST:
      return {
        ...state,
        deleteCostLoading: action.payload.loading,
        deleteCostResult: action.payload.data,
        deleteCostError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
