import axios from "axios";
import { dispatchError, dispatchSuccess } from "../../utils";

export const getUserListInternal = (accessToken, dispatch, CONSTANT_ACTION) => {
  axios
    .get("users", {
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

export const getDetailUserInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .get("users/" + id, {
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

export const addUserInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("file", data.file);
  formData.append("username", data.username);
  formData.append("password", data.password);
  axios
    .post("users", formData, {
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

export const editUserInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  const formData = new FormData();
  if (data.username) {
    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("username", data.username);
    formData.append("file", data.file);
  } else {
    formData.append("id", data.id);
    formData.append("password", data.password);
  }

  axios
    .patch("users", formData, {
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

export const deleteUserInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .delete("users/" + id, {
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
