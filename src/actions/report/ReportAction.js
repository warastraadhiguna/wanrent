import { dispatchError, dispatchLoading } from "../../utils";
import axios from "axios";
import { getDetailReportInternal, getReportListInternal } from "./ReportHelper";
import { checkAccessTokenJwtExpired } from "actions/Helper";

export const GET_REPORT_LIST = "GET_REPORT_LIST";
export const GET_DETAIL_REPORT = "GET_DETAIL_REPORT";

export const getReportList = (accessToken, filter = {}) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_REPORT_LIST);
    if (!accessToken) {
      dispatchError(dispatch, GET_REPORT_LIST, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getReportListInternal(
              response.data.accessToken,
              dispatch,
              GET_REPORT_LIST,
              filter
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_REPORT_LIST, error.response.data);
          });
      } else
        getReportListInternal(accessToken, dispatch, GET_REPORT_LIST, filter);
    }
  };
};

export const getDetailReportList = (accessToken, filter = {}) => {
  return (dispatch) => {
    dispatchLoading(dispatch, GET_DETAIL_REPORT);
    if (!accessToken) {
      dispatchError(dispatch, GET_DETAIL_REPORT, {
        message: "Authentification Failed",
      });
    } else {
      if (checkAccessTokenJwtExpired(accessToken)) {
        axios
          .get("token")
          .then((response) => {
            getDetailReportInternal(
              response.data.accessToken,
              dispatch,
              GET_DETAIL_REPORT,
              filter
            );
          })
          .catch((error) => {
            dispatchError(dispatch, GET_DETAIL_REPORT, error.response.data);
          });
      } else
        getDetailReportInternal(
          accessToken,
          dispatch,
          GET_DETAIL_REPORT,
          filter
        );
    }
  };
};
