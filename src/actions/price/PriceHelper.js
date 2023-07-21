import axios from "axios";
import { dispatchError, dispatchSuccess } from "../../utils";

export const getPriceListInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION
) => {
  axios
    .get("prices", {
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

export const getDetailPriceInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .get("prices/" + id, {
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

export const addPriceInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  axios
    .post(
      "prices",
      {
        id_type: data.id_type,
        time: data.time * 60,
        price: data.price,
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

export const editPriceInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  axios
    .patch(
      "prices",
      {
        id: data.id,
        id_type: data.id_type,
        time: data.time * 60,
        price: data.price,
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

export const deletePriceInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .delete("prices/" + id, {
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
