import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addSupplierInternal,
  deleteSupplierInternal,
  editSupplierInternal,
  getDetailSupplierInternal,
  getSupplierListInternal,
} from "./SupplierHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_SUPPLIER_LIST = "GET_SUPPLIER_LIST";
export const GET_DETAIL_SUPPLIER = "GET_DETAIL_SUPPLIER";
export const ADD_SUPPLIER = "ADD_SUPPLIER";
export const EDIT_SUPPLIER = "EDIT_SUPPLIER";
export const DELETE_SUPPLIER = "DELETE_SUPPLIER";

export const getSupplierList = (accessToken) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_SUPPLIER_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_SUPPLIER_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getSupplierListInternal(
              response.data.accessToken,
              dispatch,
              GET_SUPPLIER_LIST
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_SUPPLIER_LIST, error.response.data);
          });
      } else getSupplierListInternal(accessToken, dispatch, GET_SUPPLIER_LIST);
    }
  };
};

export const getDetailSupplier = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_SUPPLIER);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_SUPPLIER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailSupplierInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_SUPPLIER,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_SUPPLIER, error.response.data);
          });
      } else
        getDetailSupplierInternal(
          accessToken,
          dispatch,
          GET_DETAIL_SUPPLIER,
          id
        );
    }
  };
};

export const addSupplier = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_SUPPLIER);
    if (!accessToken) {
      dispatchError(dispatch, ADD_SUPPLIER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addSupplierInternal(
              response.data.accessToken,
              dispatch,
              ADD_SUPPLIER,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_SUPPLIER, error.response.data);
          });
      } else addSupplierInternal(accessToken, dispatch, ADD_SUPPLIER, data);
    }
  };
};

export const editSupplier = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_SUPPLIER);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_SUPPLIER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editSupplierInternal(
              response.data.accessToken,
              dispatch,
              EDIT_SUPPLIER,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_SUPPLIER, error.response.data);
          });
      } else editSupplierInternal(accessToken, dispatch, EDIT_SUPPLIER, data);
    }
  };
};

export const deleteSupplier = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_SUPPLIER);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_SUPPLIER, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deleteSupplierInternal(
              response.data.accessToken,
              dispatch,
              DELETE_SUPPLIER,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_SUPPLIER, error.response.data);
          });
      } else deleteSupplierInternal(accessToken, dispatch, DELETE_SUPPLIER, id);
    }
  };
};
