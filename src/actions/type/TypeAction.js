import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import { getDetailTypeInternal, getTypeListInternal } from "./TypeHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_TYPE_LIST = "GET_TYPE_LIST";
export const GET_DETAIL_TYPE = "GET_DETAIL_TYPE";

export const getTypeList = (accessToken) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_TYPE_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_TYPE_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getTypeListInternal(
              response.data.accessToken,
              dispatch,
              GET_TYPE_LIST
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_TYPE_LIST, error.response.data);
          });
      } else getTypeListInternal(accessToken, dispatch, GET_TYPE_LIST);
    }
  };
};

export const getDetailType = (accessToken, id) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_TYPE);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_TYPE, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailTypeInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_TYPE,
              id
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_TYPE, error.response.data);
          });
      } else getDetailTypeInternal(accessToken, dispatch, GET_DETAIL_TYPE, id);
    }
  };
};
