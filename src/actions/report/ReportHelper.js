import axios from "axios";
import { dispatchError, dispatchSuccess } from "../../utils";

export const getReportListInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  filter
) => {
  axios
    .get(
      "report-by-supplier?searchedText=" +
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

export const getDetailReportInternal = (
  accessToken,
  dispatch,
  CONSTANT_ACTION,
  filter
) => {
  axios
    .get(
      "report-by-ownership?searchedText=" +
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
