import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addPersonalDebtPaymentInternal,
  deletePersonalDebtPaymentInternal,
  editPersonalDebtPaymentInternal,
  getDetailPersonalDebtPaymentInternal,
  getPersonalDebtPaymentListInternal,
} from "./PersonalDebtPaymentHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_PERSONAL_DEBT_PAYMENT_LIST = "GET_PERSONAL_DEBT_PAYMENT_LIST";
export const GET_DETAIL_PERSONAL_DEBT_PAYMENT =
  "GET_DETAIL_PERSONAL_DEBT_PAYMENT";
export const ADD_PERSONAL_DEBT_PAYMENT = "ADD_PERSONAL_DEBT_PAYMENT";
export const EDIT_PERSONAL_DEBT_PAYMENT = "EDIT_PERSONAL_DEBT_PAYMENT";
export const DELETE_PERSONAL_DEBT_PAYMENT = "DELETE_PERSONAL_DEBT_PAYMENT";

export const getPersonalDebtPaymentList = (accessToken, filter) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_PERSONAL_DEBT_PAYMENT_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_PERSONAL_DEBT_PAYMENT_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getPersonalDebtPaymentListInternal(
              response.data.accessToken,
              dispatch,
              GET_PERSONAL_DEBT_PAYMENT_LIST,
              filter
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_PERSONAL_DEBT_PAYMENT_LIST,
              error.response.data
            );
          });
      } else
        getPersonalDebtPaymentListInternal(
          accessToken,
          dispatch,
          GET_PERSONAL_DEBT_PAYMENT_LIST,
          filter
        );
    }
  };
};

export const getDetailPersonalDebtPayment = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_PERSONAL_DEBT_PAYMENT);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_PERSONAL_DEBT_PAYMENT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailPersonalDebtPaymentInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_PERSONAL_DEBT_PAYMENT,
              id
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_DETAIL_PERSONAL_DEBT_PAYMENT,
              error.response.data
            );
          });
      } else
        getDetailPersonalDebtPaymentInternal(
          accessToken,
          dispatch,
          GET_DETAIL_PERSONAL_DEBT_PAYMENT,
          id
        );
    }
  };
};

export const addPersonalDebtPayment = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_PERSONAL_DEBT_PAYMENT);
    if (!accessToken) {
      dispatchError(dispatch, ADD_PERSONAL_DEBT_PAYMENT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addPersonalDebtPaymentInternal(
              response.data.accessToken,
              dispatch,
              ADD_PERSONAL_DEBT_PAYMENT,
              data
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              ADD_PERSONAL_DEBT_PAYMENT,
              error.response.data
            );
          });
      } else
        addPersonalDebtPaymentInternal(
          accessToken,
          dispatch,
          ADD_PERSONAL_DEBT_PAYMENT,
          data
        );
    }
  };
};

export const editPersonalDebtPayment = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_PERSONAL_DEBT_PAYMENT);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_PERSONAL_DEBT_PAYMENT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editPersonalDebtPaymentInternal(
              response.data.accessToken,
              dispatch,
              EDIT_PERSONAL_DEBT_PAYMENT,
              data
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              EDIT_PERSONAL_DEBT_PAYMENT,
              error.response.data
            );
          });
      } else
        editPersonalDebtPaymentInternal(
          accessToken,
          dispatch,
          EDIT_PERSONAL_DEBT_PAYMENT,
          data
        );
    }
  };
};

export const deletePersonalDebtPayment = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_PERSONAL_DEBT_PAYMENT);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_PERSONAL_DEBT_PAYMENT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deletePersonalDebtPaymentInternal(
              response.data.accessToken,
              dispatch,
              DELETE_PERSONAL_DEBT_PAYMENT,
              id
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              DELETE_PERSONAL_DEBT_PAYMENT,
              error.response.data
            );
          });
      } else
        deletePersonalDebtPaymentInternal(
          accessToken,
          dispatch,
          DELETE_PERSONAL_DEBT_PAYMENT,
          id
        );
    }
  };
};
