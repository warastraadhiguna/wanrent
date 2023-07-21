import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addUserInternal,
  deleteUserInternal,
  editUserInternal,
  getDetailUserInternal,
  getUserListInternal,
} from "./UserHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_USER_LIST = "GET_USER_LIST";
export const GET_DETAIL_USER = "GET_DETAIL_USER";
export const ADD_USER = "ADD_USER";
export const EDIT_USER = "EDIT_USER";
export const DELETE_USER = "DELETE_USER";

export const getUserList = (accessToken) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_USER_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_USER_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getUserListInternal(
              response.data.accessToken,
              dispatch,
              GET_USER_LIST
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_USER_LIST, error.response.data);
          });
      } else getUserListInternal(accessToken, dispatch, GET_USER_LIST);
    }
  };
};

export const getDetailUser = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_USER);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_USER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailUserInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_USER,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_USER, error.response.data);
          });
      } else getDetailUserInternal(accessToken, dispatch, GET_DETAIL_USER, id);
    }
  };
};

export const addUser = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_USER);
    if (!accessToken) {
      dispatchError(dispatch, ADD_USER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addUserInternal(
              response.data.accessToken,
              dispatch,
              ADD_USER,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_USER, error.response.data);
          });
      } else addUserInternal(accessToken, dispatch, ADD_USER, data);
    }
  };
};

export const editUser = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_USER);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_USER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editUserInternal(
              response.data.accessToken,
              dispatch,
              EDIT_USER,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_USER, error.response.data);
          });
      } else editUserInternal(accessToken, dispatch, EDIT_USER, data);
    }
  };
};

export const deleteUser = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_USER);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_USER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deleteUserInternal(
              response.data.accessToken,
              dispatch,
              DELETE_USER,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_USER, error.response.data);
          });
      } else deleteUserInternal(accessToken, dispatch, DELETE_USER, id);
    }
  };
};
