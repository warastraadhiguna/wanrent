import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addPersonalSavingInternal,
  deletePersonalSavingInternal,
  editPersonalSavingInternal,
  getDetailPersonalSavingInternal,
  getPersonalSavingListInternal,
} from "./PersonalSavingHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_PERSONAL_SAVING_LIST = "GET_PERSONAL_SAVING_LIST";
export const GET_DETAIL_PERSONAL_SAVING = "GET_DETAIL_PERSONAL_SAVING";
export const ADD_PERSONAL_SAVING = "ADD_PERSONAL_SAVING";
export const EDIT_PERSONAL_SAVING = "EDIT_PERSONAL_SAVING";
export const DELETE_PERSONAL_SAVING = "DELETE_PERSONAL_SAVING";

export const getPersonalSavingList = (accessToken, filter) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_PERSONAL_SAVING_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_PERSONAL_SAVING_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getPersonalSavingListInternal(
              response.data.accessToken,
              dispatch,
              GET_PERSONAL_SAVING_LIST,
              filter
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_PERSONAL_SAVING_LIST,
              error.response.data
            );
          });
      } else
        getPersonalSavingListInternal(
          accessToken,
          dispatch,
          GET_PERSONAL_SAVING_LIST,
          filter
        );
    }
  };
};

export const getDetailPersonalSaving = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_PERSONAL_SAVING);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_PERSONAL_SAVING, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailPersonalSavingInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_PERSONAL_SAVING,
              id
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_DETAIL_PERSONAL_SAVING,
              error.response.data
            );
          });
      } else
        getDetailPersonalSavingInternal(
          accessToken,
          dispatch,
          GET_DETAIL_PERSONAL_SAVING,
          id
        );
    }
  };
};

export const addPersonalSaving = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_PERSONAL_SAVING);
    if (!accessToken) {
      dispatchError(dispatch, ADD_PERSONAL_SAVING, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addPersonalSavingInternal(
              response.data.accessToken,
              dispatch,
              ADD_PERSONAL_SAVING,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_PERSONAL_SAVING, error.response.data);
          });
      } else
        addPersonalSavingInternal(
          accessToken,
          dispatch,
          ADD_PERSONAL_SAVING,
          data
        );
    }
  };
};

export const editPersonalSaving = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_PERSONAL_SAVING);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_PERSONAL_SAVING, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editPersonalSavingInternal(
              response.data.accessToken,
              dispatch,
              EDIT_PERSONAL_SAVING,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_PERSONAL_SAVING, error.response.data);
          });
      } else
        editPersonalSavingInternal(
          accessToken,
          dispatch,
          EDIT_PERSONAL_SAVING,
          data
        );
    }
  };
};

export const deletePersonalSaving = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_PERSONAL_SAVING);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_PERSONAL_SAVING, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deletePersonalSavingInternal(
              response.data.accessToken,
              dispatch,
              DELETE_PERSONAL_SAVING,
              id
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              DELETE_PERSONAL_SAVING,
              error.response.data
            );
          });
      } else
        deletePersonalSavingInternal(
          accessToken,
          dispatch,
          DELETE_PERSONAL_SAVING,
          id
        );
    }
  };
};
