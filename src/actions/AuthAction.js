import {
  dispatchError,
  dispatchLoading,
  dispatchSuccess,
  removeLocalStorage,
  saveLocalStorage,
} from "../utils";
import axios from "axios";

export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const REFRESH_TOKEN = "REFRESH_TOKEN";

export const refreshToken = () => {
  return (dispatch) => {
    dispatchLoading(dispatch, REFRESH_TOKEN);
    axios
      .get("token")
      .then((response) => {
        dispatchSuccess(dispatch, REFRESH_TOKEN, response.data);
      })
      .catch((error) => {
        dispatchError(dispatch, REFRESH_TOKEN, error.response.data);
      });
  };
};

export const loginUser = (username, password) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGIN_USER);

    axios
      .post("login", { username, password })
      .then((response) => {
        saveLocalStorage("user", response.data.data);
        dispatchSuccess(dispatch, LOGIN_USER, response.data);
      })
      .catch((error) => {
        dispatchError(dispatch, LOGIN_USER, error.response.data);
      });
  };
};

export const logoutUser = (history) => {
  return (dispatch) => {
    dispatchLoading(dispatch, LOGOUT_USER);

    axios
      .delete("logout")
      .then((response) => {
        removeLocalStorage("user");
        history.push("/login");
        dispatchSuccess(dispatch, LOGOUT_USER, response.data);
      })
      .catch((error) => {
        dispatchError(dispatch, LOGOUT_USER, error.response.data);
      });
  };
};
