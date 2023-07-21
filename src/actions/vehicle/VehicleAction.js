import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addVehicleInternal,
  deleteVehicleInternal,
  editVehicleInternal,
  getDetailVehicleInternal,
  getVehicleListInternal,
} from "./VehicleHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_VEHICLE_LIST = "GET_VEHICLE_LIST";
export const GET_DETAIL_VEHICLE = "GET_DETAIL_VEHICLE";
export const ADD_VEHICLE = "ADD_VEHICLE";
export const EDIT_VEHICLE = "EDIT_VEHICLE";
export const DELETE_VEHICLE = "DELETE_VEHICLE";

export const getVehicleList = (accessToken) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_VEHICLE_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_VEHICLE_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getVehicleListInternal(
              response.data.accessToken,
              dispatch,
              GET_VEHICLE_LIST
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_VEHICLE_LIST, error.response.data);
          });
      } else getVehicleListInternal(accessToken, dispatch, GET_VEHICLE_LIST);
    }
  };
};

export const getDetailVehicle = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_VEHICLE);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_VEHICLE, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailVehicleInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_VEHICLE,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_VEHICLE, error.response.data);
          });
      } else
        getDetailVehicleInternal(accessToken, dispatch, GET_DETAIL_VEHICLE, id);
    }
  };
};

export const addVehicle = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_VEHICLE);
    if (!accessToken) {
      dispatchError(dispatch, ADD_VEHICLE, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addVehicleInternal(
              response.data.accessToken,
              dispatch,
              ADD_VEHICLE,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_VEHICLE, error.response.data);
          });
      } else addVehicleInternal(accessToken, dispatch, ADD_VEHICLE, data);
    }
  };
};

export const editVehicle = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_VEHICLE);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_VEHICLE, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editVehicleInternal(
              response.data.accessToken,
              dispatch,
              EDIT_VEHICLE,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_VEHICLE, error.response.data);
          });
      } else editVehicleInternal(accessToken, dispatch, EDIT_VEHICLE, data);
    }
  };
};

export const deleteVehicle = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_VEHICLE);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_VEHICLE, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deleteVehicleInternal(
              response.data.accessToken,
              dispatch,
              DELETE_VEHICLE,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_VEHICLE, error.response.data);
          });
      } else deleteVehicleInternal(accessToken, dispatch, DELETE_VEHICLE, id);
    }
  };
};
