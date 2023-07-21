import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addCostInternal,
  deleteCostInternal,
  editCostInternal,
  getDetailCostInternal,
  getCostListInternal,
} from "./CostHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_COST_LIST = "GET_COST_LIST";
export const GET_DETAIL_COST = "GET_DETAIL_COST";
export const ADD_COST = "ADD_COST";
export const EDIT_COST = "EDIT_COST";
export const DELETE_COST = "DELETE_COST";

export const getCostList = (accessToken, filter) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_COST_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_COST_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getCostListInternal(
              response.data.accessToken,
              dispatch,
              GET_COST_LIST,
              filter
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_COST_LIST, error.response.data);
          });
      } else getCostListInternal(accessToken, dispatch, GET_COST_LIST, filter);
    }
  };
};

export const getDetailCost = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_COST);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_COST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailCostInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_COST,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_COST, error.response.data);
          });
      } else getDetailCostInternal(accessToken, dispatch, GET_DETAIL_COST, id);
    }
  };
};

export const addCost = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_COST);
    if (!accessToken) {
      dispatchError(dispatch, ADD_COST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addCostInternal(
              response.data.accessToken,
              dispatch,
              ADD_COST,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_COST, error.response.data);
          });
      } else addCostInternal(accessToken, dispatch, ADD_COST, data);
    }
  };
};

export const editCost = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_COST);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_COST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editCostInternal(
              response.data.accessToken,
              dispatch,
              EDIT_COST,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_COST, error.response.data);
          });
      } else editCostInternal(accessToken, dispatch, EDIT_COST, data);
    }
  };
};

export const deleteCost = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_COST);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_COST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deleteCostInternal(
              response.data.accessToken,
              dispatch,
              DELETE_COST,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_COST, error.response.data);
          });
      } else deleteCostInternal(accessToken, dispatch, DELETE_COST, id);
    }
  };
};
