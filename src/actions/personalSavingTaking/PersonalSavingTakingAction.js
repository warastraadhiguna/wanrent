import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addPersonalSavingTakingInternal,
  deletePersonalSavingTakingInternal,
  editPersonalSavingTakingInternal,
  getDetailPersonalSavingTakingInternal,
  getPersonalSavingTakingListInternal,
} from "./PersonalSavingTakingHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_PERSONAL_SAVING_TAKING_LIST =
  "GET_PERSONAL_SAVING_TAKING_LIST";
export const GET_DETAIL_PERSONAL_SAVING_TAKING =
  "GET_DETAIL_PERSONAL_SAVING_TAKING";
export const ADD_PERSONAL_SAVING_TAKING = "ADD_PERSONAL_SAVING_TAKING";
export const EDIT_PERSONAL_SAVING_TAKING = "EDIT_PERSONAL_SAVING_TAKING";
export const DELETE_PERSONAL_SAVING_TAKING = "DELETE_PERSONAL_SAVING_TAKING";

export const getPersonalSavingTakingList = (accessToken, filter) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_PERSONAL_SAVING_TAKING_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_PERSONAL_SAVING_TAKING_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getPersonalSavingTakingListInternal(
              response.data.accessToken,
              dispatch,
              GET_PERSONAL_SAVING_TAKING_LIST,
              filter
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_PERSONAL_SAVING_TAKING_LIST,
              error.response.data
            );
          });
      } else
        getPersonalSavingTakingListInternal(
          accessToken,
          dispatch,
          GET_PERSONAL_SAVING_TAKING_LIST,
          filter
        );
    }
  };
};

export const getDetailPersonalSavingTaking = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_PERSONAL_SAVING_TAKING);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_PERSONAL_SAVING_TAKING, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailPersonalSavingTakingInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_PERSONAL_SAVING_TAKING,
              id
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_DETAIL_PERSONAL_SAVING_TAKING,
              error.response.data
            );
          });
      } else
        getDetailPersonalSavingTakingInternal(
          accessToken,
          dispatch,
          GET_DETAIL_PERSONAL_SAVING_TAKING,
          id
        );
    }
  };
};

export const addPersonalSavingTaking = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_PERSONAL_SAVING_TAKING);
    if (!accessToken) {
      dispatchError(dispatch, ADD_PERSONAL_SAVING_TAKING, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addPersonalSavingTakingInternal(
              response.data.accessToken,
              dispatch,
              ADD_PERSONAL_SAVING_TAKING,
              data
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              ADD_PERSONAL_SAVING_TAKING,
              error.response.data
            );
          });
      } else
        addPersonalSavingTakingInternal(
          accessToken,
          dispatch,
          ADD_PERSONAL_SAVING_TAKING,
          data
        );
    }
  };
};

export const editPersonalSavingTaking = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_PERSONAL_SAVING_TAKING);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_PERSONAL_SAVING_TAKING, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editPersonalSavingTakingInternal(
              response.data.accessToken,
              dispatch,
              EDIT_PERSONAL_SAVING_TAKING,
              data
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              EDIT_PERSONAL_SAVING_TAKING,
              error.response.data
            );
          });
      } else
        editPersonalSavingTakingInternal(
          accessToken,
          dispatch,
          EDIT_PERSONAL_SAVING_TAKING,
          data
        );
    }
  };
};

export const deletePersonalSavingTaking = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_PERSONAL_SAVING_TAKING);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_PERSONAL_SAVING_TAKING, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deletePersonalSavingTakingInternal(
              response.data.accessToken,
              dispatch,
              DELETE_PERSONAL_SAVING_TAKING,
              id
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              DELETE_PERSONAL_SAVING_TAKING,
              error.response.data
            );
          });
      } else
        deletePersonalSavingTakingInternal(
          accessToken,
          dispatch,
          DELETE_PERSONAL_SAVING_TAKING,
          id
        );
    }
  };
};
