import axios from "axios";
import { dispatchError, dispatchSuccess } from "../../utils";

export const getOwnershipListInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION
) => {
  axios
    .get("ownerships", {
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

export const getDetailOwnershipInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .get("ownerships/" + id, {
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

export const addOwnershipInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  const formData = new FormData();
  formData.append("id_supplier", data.id_supplier);
  formData.append("id_vehicle", data.id_vehicle);
  formData.append("code", data.code);
  formData.append("note", data.note);
  formData.append("licence_plate", data.licence_plate);
  formData.append("file", data.file);

  axios
    .post("ownerships", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatchSuccess(dispatch, CONSTANT_ACTION, response.data);
    })
    .catch((error) => {
      dispatchError(dispatch, CONSTANT_ACTION, error.response.data);
    });
};

export const editOwnershipInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  const formData = new FormData();
  formData.append("id", data.id);
  formData.append("id_supplier", data.id_supplier);
  formData.append("id_vehicle", data.id_vehicle);
  formData.append("code", data.code);
  formData.append("note", data.note);
  formData.append("licence_plate", data.licence_plate);
  formData.append("file", data.file);

  axios
    .patch("ownerships", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      dispatchSuccess(dispatch, CONSTANT_ACTION, response.data);
    })
    .catch((error) => {
      dispatchError(dispatch, CONSTANT_ACTION, error.response.data);
    });
};

export const deleteOwnershipInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .delete("ownerships/" + id, {
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
