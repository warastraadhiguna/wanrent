import axios from "axios";
import { dispatchError, dispatchSuccess } from "../../utils";

export const getPersonalSavingTakingListInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  filter
) => {
  axios
    .get(
      "personal-saving-takings?id_transaction=" +
        filter.searchedText +
        "&startDate=" +
        filter.startDate +
        "&endDate=" +
        filter.endDate,
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

export const addPersonalSavingTakingInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  axios
    .post("personal-saving-takings", data, {
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

export const getDetailPersonalSavingTakingInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .get("personal-saving-takings/" + id, {
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

export const editPersonalSavingTakingInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  axios
    .patch("personal-saving-takings", data, {
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

export const deletePersonalSavingTakingInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .delete("personal-saving-takings/" + id, {
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
