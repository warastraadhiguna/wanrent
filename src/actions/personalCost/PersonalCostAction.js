import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addPersonalCostInternal,
  deletePersonalCostInternal,
  editPersonalCostInternal,
  getDetailPersonalCostInternal,
  getPersonalCostListInternal,
} from "./PersonalCostHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_PERSONAL_COST_LIST = "GET_PERSONAL_COST_LIST";
export const GET_DETAIL_PERSONAL_COST = "GET_DETAIL_PERSONAL_COST";
export const ADD_PERSONAL_COST = "ADD_PERSONAL_COST";
export const EDIT_PERSONAL_COST = "EDIT_PERSONAL_COST";
export const DELETE_PERSONAL_COST = "DELETE_PERSONAL_COST";

export const getPersonalCostList = (accessToken, filter) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_PERSONAL_COST_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_PERSONAL_COST_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getPersonalCostListInternal(
              response.data.accessToken,
              dispatch,
              GET_PERSONAL_COST_LIST,
              filter
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_PERSONAL_COST_LIST,
              error.response.data
            );
          });
      } else
        getPersonalCostListInternal(
          accessToken,
          dispatch,
          GET_PERSONAL_COST_LIST,
          filter
        );
    }
  };
};

export const getDetailPersonalCost = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_PERSONAL_COST);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_PERSONAL_COST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailPersonalCostInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_PERSONAL_COST,
              id
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_DETAIL_PERSONAL_COST,
              error.response.data
            );
          });
      } else
        getDetailPersonalCostInternal(
          accessToken,
          dispatch,
          GET_DETAIL_PERSONAL_COST,
          id
        );
    }
  };
};

export const addPersonalCost = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_PERSONAL_COST);
    if (!accessToken) {
      dispatchError(dispatch, ADD_PERSONAL_COST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addPersonalCostInternal(
              response.data.accessToken,
              dispatch,
              ADD_PERSONAL_COST,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_PERSONAL_COST, error.response.data);
          });
      } else
        addPersonalCostInternal(accessToken, dispatch, ADD_PERSONAL_COST, data);
    }
  };
};

export const editPersonalCost = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_PERSONAL_COST);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_PERSONAL_COST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editPersonalCostInternal(
              response.data.accessToken,
              dispatch,
              EDIT_PERSONAL_COST,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_PERSONAL_COST, error.response.data);
          });
      } else
        editPersonalCostInternal(
          accessToken,
          dispatch,
          EDIT_PERSONAL_COST,
          data
        );
    }
  };
};

export const deletePersonalCost = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_PERSONAL_COST);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_PERSONAL_COST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deletePersonalCostInternal(
              response.data.accessToken,
              dispatch,
              DELETE_PERSONAL_COST,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_PERSONAL_COST, error.response.data);
          });
      } else
        deletePersonalCostInternal(
          accessToken,
          dispatch,
          DELETE_PERSONAL_COST,
          id
        );
    }
  };
};
