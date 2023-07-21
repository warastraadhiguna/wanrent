import {
  GET_PERSONAL_SAVING_LIST,
  GET_DETAIL_PERSONAL_SAVING,
  ADD_PERSONAL_SAVING,
  EDIT_PERSONAL_SAVING,
  DELETE_PERSONAL_SAVING,
} from "../../actions/personalSaving/PersonalSavingAction";

const initialState = {
  getPersonalSavingLoading: false,
  getPersonalSavingResult: false,
  getPersonalSavingError: false,

  getDetailPersonalSavingLoading: false,
  getDetailPersonalSavingResult: false,
  getDetailPersonalSavingError: false,

  addPersonalSavingLoading: false,
  addPersonalSavingResult: false,
  addPersonalSavingError: false,

  editPersonalSavingLoading: false,
  editPersonalSavingResult: false,
  editPersonalSavingError: false,

  deletePersonalSavingLoading: false,
  deletePersonalSavingResult: false,
  deletePersonalSavingError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_PERSONAL_SAVING_LIST:
      return {
        ...state,
        getPersonalSavingLoading: action.payload.loading,
        getPersonalSavingResult: action.payload.data,
        getPersonalSavingError: action.payload.errorMessage,
      };
    case GET_DETAIL_PERSONAL_SAVING:
      return {
        ...state,
        getDetailPersonalSavingLoading: action.payload.loading,
        getDetailPersonalSavingResult: action.payload.data,
        getDetailPersonalSavingError: action.payload.errorMessage,
      };
    case ADD_PERSONAL_SAVING:
      return {
        ...state,
        addPersonalSavingLoading: action.payload.loading,
        addPersonalSavingResult: action.payload.data,
        addPersonalSavingError: action.payload.errorMessage,
      };
    case EDIT_PERSONAL_SAVING:
      return {
        ...state,
        editPersonalSavingLoading: action.payload.loading,
        editPersonalSavingResult: action.payload.data,
        editPersonalSavingError: action.payload.errorMessage,
      };
    case DELETE_PERSONAL_SAVING:
      return {
        ...state,
        deletePersonalSavingLoading: action.payload.loading,
        deletePersonalSavingResult: action.payload.data,
        deletePersonalSavingError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
