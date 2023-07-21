import {
  GET_REPORT_LIST,
  GET_DETAIL_REPORT,
} from "../../actions/report/ReportAction";

const initialState = {
  getReportLoading: false,
  getReportResult: false,
  getReportError: false,

  getDetailReportLoading: false,
  getDetailReportResult: false,
  getDetailReportError: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_REPORT_LIST:
      return {
        ...state,
        getReportLoading: action.payload.loading,
        getReportResult: action.payload.data,
        getReportError: action.payload.errorMessage,
      };
    case GET_DETAIL_REPORT:
      return {
        ...state,
        getDetailReportLoading: action.payload.loading,
        getDetailReportResult: action.payload.data,
        getDetailReportError: action.payload.errorMessage,
      };
    default:
      return state;
  }
}
