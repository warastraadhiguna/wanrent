import axios from "axios";
import { dispatchError, dispatchSuccess } from "../../utils";

export const getVehicleListInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION
) => {
  axios
    .get("vehicles", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      dispatchSuccess(dispatch, CONSTANT_ACTION, response.data);
    })
    .catch((error) => {
      dispatchError(dispatch, CONSTANT_ACTION, error.response.data);
    });
};

export const addVehicleInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  axios
    .post(
      "vehicles",
      {
        id_brand: data.id_brand,
        id_type: data.id_type,
        detail_type: data.detail_type,
        note: data.note,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      dispatchSuccess(dispatch, CONSTANT_ACTION, response.data);
    })
    .catch((error) => {
      dispatchError(dispatch, CONSTANT_ACTION, error.response.data);
    });
};

export const getDetailVehicleInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .get("vehicles/" + id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      dispatchSuccess(dispatch, CONSTANT_ACTION, response.data);
    })
    .catch((error) => {
      dispatchError(dispatch, CONSTANT_ACTION, error.response.data);
    });
};

export const editVehicleInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  axios
    .patch(
      "vehicles",
      {
        id: data.id,
        id_brand: data.id_brand,
        id_type: data.id_type,
        detail_type: data.detail_type,
        note: data.note,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
    .then((response) => {
      dispatchSuccess(dispatch, CONSTANT_ACTION, response.data);
    })
    .catch((error) => {
      dispatchError(dispatch, CONSTANT_ACTION, error.response.data);
    });
};

export const deleteVehicleInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .delete("vehicles/" + id, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    .then((response) => {
      dispatchSuccess(dispatch, CONSTANT_ACTION, response.data);
    })
    .catch((error) => {
      dispatchError(dispatch, CONSTANT_ACTION, error.response.data);
    });
};
