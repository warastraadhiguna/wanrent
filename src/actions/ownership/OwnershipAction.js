import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addOwnershipInternal,
  deleteOwnershipInternal,
  editOwnershipInternal,
  getDetailOwnershipInternal,
  getOwnershipListInternal,
  getOwnershipTargetValuesInternal,
} from "./OwnershipHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_OWNERSHIP_LIST = "GET_OWNERSHIP_LIST";
export const GET_DETAIL_OWNERSHIP = "GET_DETAIL_OWNERSHIP";
export const GET_OWNERSHIP_TARGET_VALUES = "GET_OWNERSHIP_TARGET_VALUES";
export const ADD_OWNERSHIP = "ADD_OWNERSHIP";
export const EDIT_OWNERSHIP = "EDIT_OWNERSHIP";
export const DELETE_OWNERSHIP = "DELETE_OWNERSHIP";

export const getOwnershipList = (accessToken) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_OWNERSHIP_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_OWNERSHIP_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getOwnershipListInternal(
              response.data.accessToken,
              dispatch,
              GET_OWNERSHIP_LIST
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_OWNERSHIP_LIST, error.response.data);
          });
      } else
        getOwnershipListInternal(accessToken, dispatch, GET_OWNERSHIP_LIST);
    }
  };
};

export const getOwnershipTargetValues = (accessToken) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_OWNERSHIP_TARGET_VALUES);
    if (!accessToken) {
      dispatchError(dispatch, GET_OWNERSHIP_TARGET_VALUES, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getOwnershipTargetValuesInternal(
              response.data.accessToken,
              dispatch,
              GET_OWNERSHIP_TARGET_VALUES
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_OWNERSHIP_TARGET_VALUES,
              error.response.data
            );
          });
      } else
        getOwnershipTargetValuesInternal(
          accessToken,
          dispatch,
          GET_OWNERSHIP_TARGET_VALUES
        );
    }
  };
};

export const getDetailOwnership = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_OWNERSHIP);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_OWNERSHIP, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailOwnershipInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_OWNERSHIP,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_OWNERSHIP, error.response.data);
          });
      } else
        getDetailOwnershipInternal(
          accessToken,
          dispatch,
          GET_DETAIL_OWNERSHIP,
          id
        );
    }
  };
};

export const addOwnership = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_OWNERSHIP);
    if (!accessToken) {
      dispatchError(dispatch, ADD_OWNERSHIP, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addOwnershipInternal(
              response.data.accessToken,
              dispatch,
              ADD_OWNERSHIP,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_OWNERSHIP, error.response.data);
          });
      } else addOwnershipInternal(accessToken, dispatch, ADD_OWNERSHIP, data);
    }
  };
};

export const editOwnership = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_OWNERSHIP);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_OWNERSHIP, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editOwnershipInternal(
              response.data.accessToken,
              dispatch,
              EDIT_OWNERSHIP,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_OWNERSHIP, error.response.data);
          });
      } else editOwnershipInternal(accessToken, dispatch, EDIT_OWNERSHIP, data);
    }
  };
};

export const deleteOwnership = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_OWNERSHIP);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_OWNERSHIP, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deleteOwnershipInternal(
              response.data.accessToken,
              dispatch,
              DELETE_OWNERSHIP,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_OWNERSHIP, error.response.data);
          });
      } else
        deleteOwnershipInternal(accessToken, dispatch, DELETE_OWNERSHIP, id);
    }
  };
};
