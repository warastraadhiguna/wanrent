import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addPaymentInternal,
  deletePaymentInternal,
  editPaymentInternal,
  getDetailPaymentInternal,
  getPaymentListInternal,
} from "./PaymentHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_PAYMENT_LIST = "GET_PAYMENT_LIST";
export const GET_DETAIL_PAYMENT = "GET_DETAIL_PAYMENT";
export const ADD_PAYMENT = "ADD_PAYMENT";
export const EDIT_PAYMENT = "EDIT_PAYMENT";
export const DELETE_PAYMENT = "DELETE_PAYMENT";

export const getPaymentList = (accessToken, id = "") => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_PAYMENT_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_PAYMENT_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getPaymentListInternal(
              response.data.accessToken,
              dispatch,
              GET_PAYMENT_LIST,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_PAYMENT_LIST, error.response.data);
          });
      } else
        getPaymentListInternal(accessToken, dispatch, GET_PAYMENT_LIST, id);
    }
  };
};

export const getDetailPayment = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_PAYMENT);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_PAYMENT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailPaymentInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_PAYMENT,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_PAYMENT, error.response.data);
          });
      } else
        getDetailPaymentInternal(accessToken, dispatch, GET_DETAIL_PAYMENT, id);
    }
  };
};

export const addPayment = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_PAYMENT);
    if (!accessToken) {
      dispatchError(dispatch, ADD_PAYMENT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addPaymentInternal(
              response.data.accessToken,
              dispatch,
              ADD_PAYMENT,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_PAYMENT, error.response.data);
          });
      } else addPaymentInternal(accessToken, dispatch, ADD_PAYMENT, data);
    }
  };
};

export const editPayment = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_PAYMENT);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_PAYMENT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editPaymentInternal(
              response.data.accessToken,
              dispatch,
              EDIT_PAYMENT,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_PAYMENT, error.response.data);
          });
      } else editPaymentInternal(accessToken, dispatch, EDIT_PAYMENT, data);
    }
  };
};

export const deletePayment = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_PAYMENT);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_PAYMENT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deletePaymentInternal(
              response.data.accessToken,
              dispatch,
              DELETE_PAYMENT,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_PAYMENT, error.response.data);
          });
      } else deletePaymentInternal(accessToken, dispatch, DELETE_PAYMENT, id);
    }
  };
};
