import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addOrderInternal,
  deleteOrderInternal,
  editOrderInternal,
  getDetailOrderInternal,
  getOrderListInternal,
} from "./OrderHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_ORDER_LIST = "GET_ORDER_LIST";
export const GET_DETAIL_ORDER = "GET_DETAIL_ORDER";
export const ADD_ORDER = "ADD_ORDER";
export const EDIT_ORDER = "EDIT_ORDER";
export const DELETE_ORDER = "DELETE_ORDER";

export const getOrderList = (accessToken, filter) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_ORDER_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_ORDER_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getOrderListInternal(
              response.data.accessToken,
              dispatch,
              GET_ORDER_LIST,
              filter
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_ORDER_LIST, error.response.data);
          });
      } else
        getOrderListInternal(accessToken, dispatch, GET_ORDER_LIST, filter);
    }
  };
};

export const getDetailOrder = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_ORDER);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_ORDER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailOrderInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_ORDER,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_ORDER, error.response.data);
          });
      } else
        getDetailOrderInternal(accessToken, dispatch, GET_DETAIL_ORDER, id);
    }
  };
};

export const addOrder = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_ORDER);
    if (!accessToken) {
      dispatchError(dispatch, ADD_ORDER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addOrderInternal(
              response.data.accessToken,
              dispatch,
              ADD_ORDER,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_ORDER, error.response.data);
          });
      } else addOrderInternal(accessToken, dispatch, ADD_ORDER, data);
    }
  };
};

export const editOrder = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_ORDER);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_ORDER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editOrderInternal(
              response.data.accessToken,
              dispatch,
              EDIT_ORDER,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_ORDER, error.response.data);
          });
      } else editOrderInternal(accessToken, dispatch, EDIT_ORDER, data);
    }
  };
};

export const deleteOrder = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_ORDER);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_ORDER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deleteOrderInternal(
              response.data.accessToken,
              dispatch,
              DELETE_ORDER,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_ORDER, error.response.data);
          });
      } else deleteOrderInternal(accessToken, dispatch, DELETE_ORDER, id);
    }
  };
};
