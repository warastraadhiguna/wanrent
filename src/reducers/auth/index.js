import {
  LOGIN_USER,
  REFRESH_TOKEN,
  LOGOUT_USER,
} from "../../actions/AuthAction";

const initialState = {
  loginUserLoading: false,
  loginUserResult: false,
  loginUserError: false,

  logoutUserLoading: false,
  logoutUserResult: false,
  logoutUserError: false,

  refreshTokenLoading: false,
  refreshTokenResult: false,
  refreshTokenError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        loginUserLoading: action.payload.loading,
        loginUserResult: action.payload.data,
        loginUserError: action.payload.errorMessage,
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        refreshTokenLoading: action.payload.loading,
        refreshTokenResult: action.payload.data,
        refreshTokenError: action.payload.errorMessage,
      };
    case LOGOUT_USER:
      return {
        ...state,
        logoutUserLoading: action.payload.loading,
        logoutUserResult: action.payload.data,
        logoutUserError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
