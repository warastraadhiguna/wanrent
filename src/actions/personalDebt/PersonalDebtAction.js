import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addPersonalDebtInternal,
  deletePersonalDebtInternal,
  editPersonalDebtInternal,
  getDetailPersonalDebtInternal,
  getPersonalDebtListInternal,
} from "./PersonalDebtHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_PERSONAL_DEBT_LIST = "GET_PERSONAL_DEBT_LIST";
export const GET_DETAIL_PERSONAL_DEBT = "GET_DETAIL_PERSONAL_DEBT";
export const ADD_PERSONAL_DEBT = "ADD_PERSONAL_DEBT";
export const EDIT_PERSONAL_DEBT = "EDIT_PERSONAL_DEBT";
export const DELETE_PERSONAL_DEBT = "DELETE_PERSONAL_DEBT";

export const getPersonalDebtList = (accessToken, filter) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_PERSONAL_DEBT_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_PERSONAL_DEBT_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getPersonalDebtListInternal(
              response.data.accessToken,
              dispatch,
              GET_PERSONAL_DEBT_LIST,
              filter
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_PERSONAL_DEBT_LIST,
              error.response.data
            );
          });
      } else
        getPersonalDebtListInternal(
          accessToken,
          dispatch,
          GET_PERSONAL_DEBT_LIST,
          filter
        );
    }
  };
};

export const getDetailPersonalDebt = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_PERSONAL_DEBT);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_PERSONAL_DEBT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailPersonalDebtInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_PERSONAL_DEBT,
              id
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_DETAIL_PERSONAL_DEBT,
              error.response.data
            );
          });
      } else
        getDetailPersonalDebtInternal(
          accessToken,
          dispatch,
          GET_DETAIL_PERSONAL_DEBT,
          id
        );
    }
  };
};

export const addPersonalDebt = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_PERSONAL_DEBT);
    if (!accessToken) {
      dispatchError(dispatch, ADD_PERSONAL_DEBT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addPersonalDebtInternal(
              response.data.accessToken,
              dispatch,
              ADD_PERSONAL_DEBT,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_PERSONAL_DEBT, error.response.data);
          });
      } else
        addPersonalDebtInternal(accessToken, dispatch, ADD_PERSONAL_DEBT, data);
    }
  };
};

export const editPersonalDebt = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_PERSONAL_DEBT);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_PERSONAL_DEBT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editPersonalDebtInternal(
              response.data.accessToken,
              dispatch,
              EDIT_PERSONAL_DEBT,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_PERSONAL_DEBT, error.response.data);
          });
      } else
        editPersonalDebtInternal(
          accessToken,
          dispatch,
          EDIT_PERSONAL_DEBT,
          data
        );
    }
  };
};

export const deletePersonalDebt = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_PERSONAL_DEBT);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_PERSONAL_DEBT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deletePersonalDebtInternal(
              response.data.accessToken,
              dispatch,
              DELETE_PERSONAL_DEBT,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_PERSONAL_DEBT, error.response.data);
          });
      } else
        deletePersonalDebtInternal(
          accessToken,
          dispatch,
          DELETE_PERSONAL_DEBT,
          id
        );
    }
  };
};
