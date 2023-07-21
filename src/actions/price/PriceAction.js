import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addPriceInternal,
  deletePriceInternal,
  editPriceInternal,
  getDetailPriceInternal,
  getPriceListInternal,
} from "./PriceHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_PRICE_LIST = "GET_PRICE_LIST";
export const GET_DETAIL_PRICE = "GET_DETAIL_PRICE";
export const ADD_PRICE = "ADD_PRICE";
export const EDIT_PRICE = "EDIT_PRICE";
export const DELETE_PRICE = "DELETE_PRICE";

export const getPriceList = (accessToken) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_PRICE_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_PRICE_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getPriceListInternal(
              response.data.accessToken,
              dispatch,
              GET_PRICE_LIST
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_PRICE_LIST, error.response.data);
          });
      } else getPriceListInternal(accessToken, dispatch, GET_PRICE_LIST);
    }
  };
};

export const getDetailPrice = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_PRICE);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_PRICE, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailPriceInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_PRICE,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_PRICE, error.response.data);
          });
      } else
        getDetailPriceInternal(accessToken, dispatch, GET_DETAIL_PRICE, id);
    }
  };
};

export const addPrice = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_PRICE);
    if (!accessToken) {
      dispatchError(dispatch, ADD_PRICE, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addPriceInternal(
              response.data.accessToken,
              dispatch,
              ADD_PRICE,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_PRICE, error.response.data);
          });
      } else addPriceInternal(accessToken, dispatch, ADD_PRICE, data);
    }
  };
};

export const editPrice = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_PRICE);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_PRICE, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editPriceInternal(
              response.data.accessToken,
              dispatch,
              EDIT_PRICE,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_PRICE, error.response.data);
          });
      } else editPriceInternal(accessToken, dispatch, EDIT_PRICE, data);
    }
  };
};

export const deletePrice = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_PRICE);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_PRICE, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deletePriceInternal(
              response.data.accessToken,
              dispatch,
              DELETE_PRICE,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_PRICE, error.response.data);
          });
      } else deletePriceInternal(accessToken, dispatch, DELETE_PRICE, id);
    }
  };
};
