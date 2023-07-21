import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import {
  addTransactionInternal,
  deleteTransactionInternal,
  editTransactionInternal,
  endTransactionInternal,
  getDetailTransactionByCodeInternal,
  // endTransactionInternal,
  getDetailTransactionInternal,
  getTransactionListInternal,
} from "./TransactionHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_TRANSACTION_LIST = "GET_TRANSACTION_LIST";
export const GET_DETAIL_TRANSACTION = "GET_DETAIL_TRANSACTION";
export const GET_DETAIL_TRANSACTION_BY_CODE = "GET_DETAIL_TRANSACTION_BY_CODE";
export const ADD_TRANSACTION = "ADD_TRANSACTION";
export const EDIT_TRANSACTION = "EDIT_TRANSACTION";
export const END_TRANSACTION = "END_TRANSACTION";
export const DELETE_TRANSACTION = "DELETE_TRANSACTION";

export const getTransactionList = (accessToken, all = true, filter = {}) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_TRANSACTION_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_TRANSACTION_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getTransactionListInternal(
              response.data.accessToken,
              dispatch,
              GET_TRANSACTION_LIST,
              all,
              filter
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_TRANSACTION_LIST, error.response.data);
          });
      } else
        getTransactionListInternal(
          accessToken,
          dispatch,
          GET_TRANSACTION_LIST,
          all,
          filter
        );
    }
  };
};

export const getDetailTransaction = (accessToken, id, isActive = true) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_TRANSACTION);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_TRANSACTION, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailTransactionInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_TRANSACTION,
              id,
              isActive
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_DETAIL_TRANSACTION,
              error.response.data
            );
          });
      } else
        getDetailTransactionInternal(
          accessToken,
          dispatch,
          GET_DETAIL_TRANSACTION,
          id,
          isActive
        );
    }
  };
};

export const getDetailTransactionByCode = (accessToken, code) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_TRANSACTION_BY_CODE);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_TRANSACTION_BY_CODE, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailTransactionByCodeInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_TRANSACTION_BY_CODE,
              code
            );
          })
          .catch((error) => {
            dispatchError(
              dispatch,
              GET_DETAIL_TRANSACTION_BY_CODE,
              error.response.data
            );
          });
      } else
        getDetailTransactionByCodeInternal(
          accessToken,
          dispatch,
          GET_DETAIL_TRANSACTION_BY_CODE,
          code
        );
    }
  };
};

export const addTransaction = (accessToken, code) => {
  return (dispatch) => {
    dispatchLoading(dispatch, ADD_TRANSACTION);
    if (!accessToken) {
      dispatchError(dispatch, ADD_TRANSACTION, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            addTransactionInternal(
              response.data.accessToken,
              dispatch,
              ADD_TRANSACTION,
              code
            );
          })
          .catch((error) => {
            dispatchError(dispatch, ADD_TRANSACTION, error.response.data);
          });
      } else
        addTransactionInternal(accessToken, dispatch, ADD_TRANSACTION, code);
    }
  };
};

export const editTransaction = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, EDIT_TRANSACTION);
    if (!accessToken) {
      dispatchError(dispatch, EDIT_TRANSACTION, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            editTransactionInternal(
              response.data.accessToken,
              dispatch,
              EDIT_TRANSACTION,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, EDIT_TRANSACTION, error.response.data);
          });
      } else
        editTransactionInternal(accessToken, dispatch, EDIT_TRANSACTION, data);
    }
  };
};

export const endTransaction = (accessToken, data) => {
  return (dispatch) => {
    dispatchLoading(dispatch, END_TRANSACTION);
    if (!accessToken) {
      dispatchError(dispatch, END_TRANSACTION, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            endTransactionInternal(
              response.data.accessToken,
              dispatch,
              END_TRANSACTION,
              data
            );
          })
          .catch((error) => {
            dispatchError(dispatch, END_TRANSACTION, error.response.data);
          });
      } else
        endTransactionInternal(accessToken, dispatch, END_TRANSACTION, data);
    }
  };
};

export const deleteTransaction = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, DELETE_TRANSACTION);
    if (!accessToken) {
      dispatchError(dispatch, DELETE_TRANSACTION, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            deleteTransactionInternal(
              response.data.accessToken,
              dispatch,
              DELETE_TRANSACTION,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, DELETE_TRANSACTION, error.response.data);
          });
      } else
        deleteTransactionInternal(
          accessToken,
          dispatch,
          DELETE_TRANSACTION,
          id
        );
    }
  };
};
