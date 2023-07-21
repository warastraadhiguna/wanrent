import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addBrandInternal,
  deleteBrandInternal,
  editBrandInternal,
  getDetailBrandInternal,
  getBrandListInternal,
} from "./BrandHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_BRAND_LIST = "GET_BRAND_LIST";
export const GET_DETAIL_BRAND = "GET_DETAIL_BRAND";
export const ADD_BRAND = "ADD_BRAND";
export const EDIT_BRAND = "EDIT_BRAND";
export const DELETE_BRAND = "DELETE_BRAND";

export const getBrandList = (accessToken) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_BRAND_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_BRAND_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getBrandListInternal(
              response.data.accessToken,
              dispatch,
              GET_BRAND_LIST
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_BRAND_LIST, error.response.data);
          });
      } else getBrandListInternal(accessToken, dispatch, GET_BRAND_LIST);
    }
  };
};

export const getDetailBrand = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_BRAND);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_BRAND, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailBrandInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_BRAND,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_BRAND, error.response.data);
          });
      } else
        getDetailBrandInternal(accessToken, dispatch, GET_DETAIL_BRAND, id);
    }
  };
};

export const addBrand = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_BRAND);
    if (!accessToken) {
      dispatchError(dispatch, ADD_BRAND, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addBrandInternal(
              response.data.accessToken,
              dispatch,
              ADD_BRAND,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_BRAND, error.response.data);
          });
      } else addBrandInternal(accessToken, dispatch, ADD_BRAND, data);
    }
  };
};

export const editBrand = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_BRAND);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_BRAND, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editBrandInternal(
              response.data.accessToken,
              dispatch,
              EDIT_BRAND,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_BRAND, error.response.data);
          });
      } else editBrandInternal(accessToken, dispatch, EDIT_BRAND, data);
    }
  };
};

export const deleteBrand = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_BRAND);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_BRAND, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deleteBrandInternal(
              response.data.accessToken,
              dispatch,
              DELETE_BRAND,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_BRAND, error.response.data);
          });
      } else deleteBrandInternal(accessToken, dispatch, DELETE_BRAND, id);
    }
  };
};
