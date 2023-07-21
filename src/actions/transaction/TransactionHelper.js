import axios from "axios";
import { dispatchError, dispatchSuccess } from "../../utils";

export const getTransactionListInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  all,
  filter
) => {
  axios
    .get(
      all
        ? "transactions?searchedText=" +
            filter.searchedText +
            "&startDate=" +
            filter.startDate +
            "&endDate=" +
            filter.endDate
        : "active-transactions",
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

export const addTransactionInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  code
) => {
  axios
    .post(
      "transactions",
      {
        code: code,
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

export const getDetailTransactionInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id,
  isActive
) => {
  axios
    .get((isActive ? "" : "detail-") + "transactions/" + id, {
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

export const getDetailTransactionByCodeInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  code
) => {
  axios
    .get("transactions-by-code/" + code, {
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

export const editTransactionInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  axios
    .patch(
      "transactions",
      {
        id: data.id,
        id_customer: data.id_customer,
        note: data.note,
        code: data.code,
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

export const endTransactionInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  data
) => {
  axios
    .patch(
      "end-transactions",
      {
        id: data.id,
        total: data.total,
        downPayment: data.downPayment,
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

export const deleteTransactionInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  id
) => {
  axios
    .delete("transactions/" + id, {
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
