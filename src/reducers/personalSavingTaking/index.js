import {
  GET_PERSONAL_SAVING_TAKING_LIST,
  GET_DETAIL_PERSONAL_SAVING_TAKING,
  ADD_PERSONAL_SAVING_TAKING,
  EDIT_PERSONAL_SAVING_TAKING,
  DELETE_PERSONAL_SAVING_TAKING,
} from "../../actions/personalSavingTaking/PersonalSavingTakingAction";

const initialState = {
  getPersonalSavingTakingLoading: false,
  getPersonalSavingTakingResult: false,
  getPersonalSavingTakingError: false,

  getDetailPersonalSavingTakingLoading: false,
  getDetailPersonalSavingTakingResult: false,
  getDetailPersonalSavingTakingError: false,

  addPersonalSavingTakingLoading: false,
  addPersonalSavingTakingResult: false,
  addPersonalSavingTakingError: false,

  editPersonalSavingTakingLoading: false,
  editPersonalSavingTakingResult: false,
  editPersonalSavingTakingError: false,

  deletePersonalSavingTakingLoading: false,
  deletePersonalSavingTakingResult: false,
  deletePersonalSavingTakingError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PERSONAL_SAVING_TAKING_LIST:
      return {
        ...state,
        getPersonalSavingTakingLoading: action.payload.loading,
        getPersonalSavingTakingResult: action.payload.data,
        getPersonalSavingTakingError: action.payload.errorMessage,
      };
    case GET_DETAIL_PERSONAL_SAVING_TAKING:
      return {
        ...state,
        getDetailPersonalSavingTakingLoading: action.payload.loading,
        getDetailPersonalSavingTakingResult: action.payload.data,
        getDetailPersonalSavingTakingError: action.payload.errorMessage,
      };
    case ADD_PERSONAL_SAVING_TAKING:
      return {
        ...state,
        addPersonalSavingTakingLoading: action.payload.loading,
        addPersonalSavingTakingResult: action.payload.data,
        addPersonalSavingTakingError: action.payload.errorMessage,
      };
    case EDIT_PERSONAL_SAVING_TAKING:
      return {
        ...state,
        editPersonalSavingTakingLoading: action.payload.loading,
        editPersonalSavingTakingResult: action.payload.data,
        editPersonalSavingTakingError: action.payload.errorMessage,
      };
    case DELETE_PERSONAL_SAVING_TAKING:
      return {
        ...state,
        deletePersonalSavingTakingLoading: action.payload.loading,
        deletePersonalSavingTakingResult: action.payload.data,
        deletePersonalSavingTakingError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
