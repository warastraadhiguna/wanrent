import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addCustomerInternal,
  deleteCustomerInternal,
  editCustomerInternal,
  getDetailCustomerInternal,
  getCustomerListInternal,
} from "./CustomerHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_CUSTOMER_LIST = "GET_CUSTOMER_LIST";
export const GET_DETAIL_CUSTOMER = "GET_DETAIL_CUSTOMER";
export const ADD_CUSTOMER = "ADD_CUSTOMER";
export const EDIT_CUSTOMER = "EDIT_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

export const getCustomerList = (accessToken, searchedText = "") => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_CUSTOMER_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_CUSTOMER_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getCustomerListInternal(
              response.data.accessToken,
              dispatch,
              GET_CUSTOMER_LIST,
              searchedText
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_CUSTOMER_LIST, error.response.data);
          });
      } else
        getCustomerListInternal(
          accessToken,
          dispatch,
          GET_CUSTOMER_LIST,
          searchedText
        );
    }
  };
};

export const getDetailCustomer = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_CUSTOMER);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_CUSTOMER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailCustomerInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_CUSTOMER,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_CUSTOMER, error.response.data);
          });
      } else
        getDetailCustomerInternal(
          accessToken,
          dispatch,
          GET_DETAIL_CUSTOMER,
          id
        );
    }
  };
};

export const addCustomer = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_CUSTOMER);
    if (!accessToken) {
      dispatchError(dispatch, ADD_CUSTOMER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addCustomerInternal(
              response.data.accessToken,
              dispatch,
              ADD_CUSTOMER,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_CUSTOMER, error.response.data);
          });
      } else addCustomerInternal(accessToken, dispatch, ADD_CUSTOMER, data);
    }
  };
};

export const editCustomer = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_CUSTOMER);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_CUSTOMER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editCustomerInternal(
              response.data.accessToken,
              dispatch,
              EDIT_CUSTOMER,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_CUSTOMER, error.response.data);
          });
      } else editCustomerInternal(accessToken, dispatch, EDIT_CUSTOMER, data);
    }
  };
};

export const deleteCustomer = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_CUSTOMER);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_CUSTOMER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deleteCustomerInternal(
              response.data.accessToken,
              dispatch,
              DELETE_CUSTOMER,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_CUSTOMER, error.response.data);
          });
      } else deleteCustomerInternal(accessToken, dispatch, DELETE_CUSTOMER, id);
    }
  };
};
