import {
  GET_PERSONAL_COST_LIST,
  GET_DETAIL_PERSONAL_COST,
  ADD_PERSONAL_COST,
  EDIT_PERSONAL_COST,
  DELETE_PERSONAL_COST,
} from "../../actions/personalCost/PersonalCostAction";

const initialState = {
  getPersonalCostLoading: false,
  getPersonalCostResult: false,
  getPersonalCostError: false,

  getDetailPersonalCostLoading: false,
  getDetailPersonalCostResult: false,
  getDetailPersonalCostError: false,

  addPersonalCostLoading: false,
  addPersonalCostResult: false,
  addPersonalCostError: false,

  editPersonalCostLoading: false,
  editPersonalCostResult: false,
  editPersonalCostError: false,

  deletePersonalCostLoading: false,
  deletePersonalCostResult: false,
  deletePersonalCostError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PERSONAL_COST_LIST:
      return {
        ...state,
        getPersonalCostLoading: action.payload.loading,
        getPersonalCostResult: action.payload.data,
        getPersonalCostError: action.payload.errorMessage,
      };
    case GET_DETAIL_PERSONAL_COST:
      return {
        ...state,
        getDetailPersonalCostLoading: action.payload.loading,
        getDetailPersonalCostResult: action.payload.data,
        getDetailPersonalCostError: action.payload.errorMessage,
      };
    case ADD_PERSONAL_COST:
      return {
        ...state,
        addPersonalCostLoading: action.payload.loading,
        addPersonalCostResult: action.payload.data,
        addPersonalCostError: action.payload.errorMessage,
      };
    case EDIT_PERSONAL_COST:
      return {
        ...state,
        editPersonalCostLoading: action.payload.loading,
        editPersonalCostResult: action.payload.data,
        editPersonalCostError: action.payload.errorMessage,
      };
    case DELETE_PERSONAL_COST:
      return {
        ...state,
        deletePersonalCostLoading: action.payload.loading,
        deletePersonalCostResult: action.payload.data,
        deletePersonalCostError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
