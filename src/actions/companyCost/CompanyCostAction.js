import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addCompanyCostInternal,
  deleteCompanyCostInternal,
  editCompanyCostInternal,
  getDetailCompanyCostInternal,
  getCompanyCostListInternal,
} from "./CompanyCostHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_COMPANY_COST_LIST = "GET_COMPANY_COST_LIST";
export const GET_DETAIL_COMPANY_COST = "GET_DETAIL_COMPANY_COST";
export const ADD_COMPANY_COST = "ADD_COMPANY_COST";
export const EDIT_COMPANY_COST = "EDIT_COMPANY_COST";
export const DELETE_COMPANY_COST = "DELETE_COMPANY_COST";

export const getCompanyCostList = (accessToken, filter) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_COMPANY_COST_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_COMPANY_COST_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getCompanyCostListInternal(
              response.data.accessToken,
              dispatch,
              GET_COMPANY_COST_LIST,
              filter
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_COMPANY_COST_LIST, error.response.data);
          });
      } else
        getCompanyCostListInternal(
          accessToken,
          dispatch,
          GET_COMPANY_COST_LIST,
          filter
        );
    }
  };
};

export const getDetailCompanyCost = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_COMPANY_COST);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_COMPANY_COST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailCompanyCostInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_COMPANY_COST,
              id
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_DETAIL_COMPANY_COST,
              error.response.data
            );
          });
      } else
        getDetailCompanyCostInternal(
          accessToken,
          dispatch,
          GET_DETAIL_COMPANY_COST,
          id
        );
    }
  };
};

export const addCompanyCost = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_COMPANY_COST);
    if (!accessToken) {
      dispatchError(dispatch, ADD_COMPANY_COST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addCompanyCostInternal(
              response.data.accessToken,
              dispatch,
              ADD_COMPANY_COST,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_COMPANY_COST, error.response.data);
          });
      } else
        addCompanyCostInternal(accessToken, dispatch, ADD_COMPANY_COST, data);
    }
  };
};

export const editCompanyCost = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_COMPANY_COST);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_COMPANY_COST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editCompanyCostInternal(
              response.data.accessToken,
              dispatch,
              EDIT_COMPANY_COST,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_COMPANY_COST, error.response.data);
          });
      } else
        editCompanyCostInternal(accessToken, dispatch, EDIT_COMPANY_COST, data);
    }
  };
};

export const deleteCompanyCost = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_COMPANY_COST);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_COMPANY_COST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deleteCompanyCostInternal(
              response.data.accessToken,
              dispatch,
              DELETE_COMPANY_COST,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_COMPANY_COST, error.response.data);
          });
      } else
        deleteCompanyCostInternal(
          accessToken,
          dispatch,
          DELETE_COMPANY_COST,
          id
        );
    }
  };
};
