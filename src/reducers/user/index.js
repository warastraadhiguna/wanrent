import {
  GET_USER_LIST,
  GET_DETAIL_USER,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
} from "../../actions/user/UserAction";

const initialState = {
  getUserLoading: false,
  getUserResult: false,
  getUserError: false,

  getDetailUserLoading: false,
  getDetailUserResult: false,
  getDetailUserError: false,

  addUserLoading: false,
  addUserResult: false,
  addUserError: false,

  editUserLoading: false,
  editUserResult: false,
  editUserError: false,

  deleteUserLoading: false,
  deleteUserResult: false,
  deleteUserError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER_LIST:
      return {
        ...state,
        getUserLoading: action.payload.loading,
        getUserResult: action.payload.data,
        getUserError: action.payload.errorMessage,
      };
    case GET_DETAIL_USER:
      return {
        ...state,
        getDetailUserLoading: action.payload.loading,
        getDetailUserResult: action.payload.data,
        getDetailUserError: action.payload.errorMessage,
      };
    case ADD_USER:
      return {
        ...state,
        addUserLoading: action.payload.loading,
        addUserResult: action.payload.data,
        addUserError: action.payload.errorMessage,
      };
    case EDIT_USER:
      return {
        ...state,
        editUserLoading: action.payload.loading,
        editUserResult: action.payload.data,
        editUserError: action.payload.errorMessage,
      };
    case DELETE_USER:
      return {
        ...state,
        deleteUserLoading: action.payload.loading,
        deleteUserResult: action.payload.data,
        deleteUserError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
