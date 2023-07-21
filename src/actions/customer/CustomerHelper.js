import axios from "axios";
import { dispatchError, dispatchSuccess } from "../../utils";

export const getCustomerListInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  searchedText = ""
) => {
  axios
    .get("customers?searchedText=" + searchedText, {
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

export const getDetailCustomerInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .get("customers/" + id, {
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

export const addCustomerInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("file", data.file);
  formData.append("phone", data.phone);
  formData.append("note", data.note);
  axios
    .post("customers", formData, {
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

export const editCustomerInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  const formData = new FormData();

  formData.append("id", data.id);
  formData.append("name", data.name);
  formData.append("phone", data.phone);
  formData.append("file", data.file);
  formData.append("note", data.note);

  axios
    .patch("customers", formData, {
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

export const deleteCustomerInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .delete("customers/" + id, {
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
