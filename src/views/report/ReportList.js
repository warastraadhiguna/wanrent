import { refreshToken } from "actions/AuthAction";
import { getCompanyCostList } from "actions/companyCost/CompanyCostAction";
import { getDetailReportList } from "actions/report/ReportAction";
import { getReportList } from "actions/report/ReportAction";
import DetailCompanyCostReportModal from "components/Modal/companyCost/DetailCompanyCostReportModal";
import DetailReportModal from "components/Modal/report/DetailReportModal";
import { DateComponent } from "components/Table/DateComponent";
import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import swal from "sweetalert";
import { numberWithCommas } from "utils";

export class ReportList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: "",
      detailReport: false,
      choosenDetailReport: false,
      modalDetailToggle: false,
      modalDetailCompanyCostToggle: false,

      startDate: "",
      endDate: "",
      isDateFilterChanged: false,

      totalCompanyCostSummary: 0,
      totalPaymentSummary: 0,
      totalRealPaymentSummary: 0,
      totalPersonalCostSummary: 0,
      totalTotalCostSummary: 0,
      totalNettoSummary: 0,
      totalRealNettoSummary: 0,

      detailTotalPaymentSummary: 0,
      detailTotalTotalCostSummary: 0,
      detailTotalNettoSummary: 0,
      detailTotalRealNettoSummary: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      getDetailReportResult,
      getDetailReportError,
      getReportResult,
      getReportError,
      refreshTokenError,
      refreshTokenResult,
      getCompanyCostResult,
      getCompanyCostError,
    } = this.props;
    if (
      refreshTokenError &&
      prevProps.refreshTokenError !== refreshTokenError
    ) {
      swal("Error!", refreshTokenError.message, "error");
      this.props.history.push("/login");
    }

    if (
      refreshTokenResult &&
      prevProps.refreshTokenResult !== refreshTokenResult
    ) {
      this.setState({ accessToken: refreshTokenResult.accessToken });
      this.getData(refreshTokenResult.accessToken);
    }
    if (getReportResult && prevProps.getReportResult !== getReportResult) {
      this.setState({
        isDateFilterChanged: false,
      });

      let totalPaymentSummary = 0;
      let totalRealPaymentSummary = 0;
      let totalPersonalCostSummary = 0;
      let totalTotalCostSummary = 0;
      let totalNettoSummary = 0;
      let totalRealNettoSummary = 0;

      getReportResult.data.map((report) => {
        totalPaymentSummary =
          totalPaymentSummary + parseInt(report.total_payment_rent);
        totalRealPaymentSummary =
          totalRealPaymentSummary + parseInt(report.total_real_payment_rent);
        totalPersonalCostSummary =
          totalPersonalCostSummary + parseInt(report.personal_cost_total);
        totalTotalCostSummary =
          totalTotalCostSummary + parseInt(report.cost_total);
        totalNettoSummary = totalNettoSummary + parseInt(report.netto);
        totalRealNettoSummary =
          totalRealNettoSummary + parseInt(report.real_netto);
        return 0;
      });

      this.setState({
        totalPaymentSummary,
        totalRealPaymentSummary,
        totalPersonalCostSummary,
        totalTotalCostSummary,
        totalNettoSummary,
        totalRealNettoSummary,
      });
    }
    if (getReportError && prevProps.getReportError !== getReportError) {
      swal("Error!", getReportError.message, "error");
      this.props.history.push("/admin/dashboard");
    }
    if (
      getDetailReportResult &&
      prevProps.getDetailReportResult !== getDetailReportResult
    ) {
      this.setState({ detailReport: getDetailReportResult.data });
    }
    if (
      getDetailReportError &&
      prevProps.getDetailReportError !== getDetailReportError
    ) {
      swal("Error!", getDetailReportError.message, "error");
    }

    if (
      getCompanyCostResult &&
      prevProps.getCompanyCostResult !== getCompanyCostResult
    ) {
      this.setState({
        pagesCount: Math.ceil(
          getCompanyCostResult.data.length / this.state.pageSize
        ),
        totalData: getCompanyCostResult.data.length,
        isDateFilterChanged: false,
      });

      let totalCompanyCostSummary = 0;
      getCompanyCostResult.data.map(
        (cost) =>
          (totalCompanyCostSummary = totalCompanyCostSummary + cost.total)
      );

      this.setState({
        totalCompanyCostSummary,
      });
    }

    if (
      getCompanyCostError &&
      prevProps.getCompanyCostError !== getCompanyCostError
    ) {
      swal("Error!", getCompanyCostError.message, "error");
    }
  }

  getData = (accessToken) => {
    const { startDate, endDate } = this.state;
    const startDateInput = startDate
      ? startDate
      : moment(new Date()).format("YYYY/MM/DD");
    const endDateInput = endDate
      ? endDate
      : moment(new Date()).format("YYYY/MM/DD");

    this.props.dispatch(
      getReportList(accessToken, {
        startDate: startDateInput,
        endDate: endDateInput,
      })
    );
    this.props.dispatch(
      getDetailReportList(accessToken, {
        startDate: startDateInput,
        endDate: endDateInput,
      })
    );

    this.props.dispatch(
      getCompanyCostList(accessToken, {
        searchedText: "",
        startDate: startDateInput,
        endDate: endDateInput,
      })
    );
  };

  setIsDateFilterChanged = (isDateFilterChanged) => {
    this.setState({ isDateFilterChanged });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  filterHandleSubmit = (event) => {
    const { accessToken } = this.state;
    event.preventDefault();
    this.getData(accessToken);
  };

  handleDetailReport = (id) => {
    const { detailReport } = this.state;

    const choosenDetailReport = detailReport.filter(
      (detail) => detail.id_supplier === id
    );

    let detailTotalPaymentSummary = 0;
    let detailTotalTotalCostSummary = 0;
    let detailTotalNettoSummary = 0;
    let detailTotalRealNettoSummary = 0;

    choosenDetailReport.map((report) => {
      detailTotalPaymentSummary =
        detailTotalPaymentSummary + parseInt(report.total_payment_rent);
      detailTotalTotalCostSummary =
        detailTotalTotalCostSummary + parseInt(report.total_cost);
      detailTotalNettoSummary =
        detailTotalNettoSummary + parseInt(report.netto);
      detailTotalRealNettoSummary =
        detailTotalNettoSummary + parseInt(report.real_netto);
      return 0;
    });

    this.setState({
      modalDetailToggle: true,
      choosenDetailReport,
      detailTotalPaymentSummary,
      detailTotalTotalCostSummary,
      detailTotalNettoSummary,
      detailTotalRealNettoSummary,
    });
  };

  render() {
    const {
      startDate,
      endDate,
      isDateFilterChanged,
      totalPaymentSummary,
      totalRealPaymentSummary,
      totalPersonalCostSummary,
      totalTotalCostSummary,
      totalNettoSummary,
      totalRealNettoSummary,
      totalCompanyCostSummary,
    } = this.state;
    const { getReportLoading, getReportResult } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Report</CardTitle>
                <Row>
                  <Col md={4}>
                    <DateComponent
                      startDate={startDate}
                      endDate={endDate}
                      isDateFilterChanged={isDateFilterChanged}
                      setIsDateFilterChanged={this.setIsDateFilterChanged}
                      handleChange={this.handleChange}
                      filterHandleSubmit={this.filterHandleSubmit}
                    />
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table bordered striped responsive>
                  <thead className="text-primary">
                    <tr>
                      <th width="5%">No</th>
                      <th>Name</th>
                      <th width="15%">Total Payment</th>
                      <th width="15%">Total Personal Cost</th>
                      <th width="15%">Total Cost</th>
                      <th width="15%">Net</th>
                      <th width="10%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getReportResult ? (
                      getReportResult.data.map((report, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{report.name}</td>
                          <td>
                            {numberWithCommas(report.total_payment_rent)}
                            <br />
                            <small>
                              {numberWithCommas(report.total_real_payment_rent)}
                            </small>
                          </td>
                          <td>
                            {numberWithCommas(report.personal_cost_total)}
                          </td>
                          <td>{numberWithCommas(report.cost_total)}</td>
                          <td>
                            {numberWithCommas(report.netto)}
                            <br />
                            <small>{numberWithCommas(report.real_netto)}</small>
                          </td>
                          <td align="center">
                            <Button
                              color="info"
                              className="ml-2"
                              onClick={() =>
                                this.handleDetailReport(report.id)
                              }>
                              <i className="nc-icon nc-zoom-split"></i> Detail
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getReportLoading ? (
                      <tr>
                        <td colSpan={7} align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={7} align="center">
                          Data Kosong
                        </td>
                      </tr>
                    )}
                    <tr className="font-weight-bold">
                      <td colSpan={2}>TOTAL</td>
                      <td>
                        Rp. {numberWithCommas(totalPaymentSummary)} <br />
                        <small>
                          Rp. {numberWithCommas(totalRealPaymentSummary)}
                        </small>
                      </td>
                      <td>Rp. {numberWithCommas(totalPersonalCostSummary)}</td>
                      <td>Rp. {numberWithCommas(totalTotalCostSummary)}</td>
                      <td colSpan={2}>
                        Rp. {numberWithCommas(totalNettoSummary)}
                        <br />
                        <small>
                          Rp. {numberWithCommas(totalRealNettoSummary)}
                        </small>
                      </td>
                    </tr>
                    <tr className="font-weight-bold">
                      <td colSpan={5}>COMPANY COST</td>
                      <td>Rp. {numberWithCommas(totalCompanyCostSummary)}</td>
                      <td>
                        <Button
                          color="info"
                          className="ml-2"
                          onClick={() =>
                            this.setState({
                              modalDetailCompanyCostToggle: true,
                            })
                          }>
                          <i className="nc-icon nc-zoom-split"></i> Detail
                        </Button>
                      </td>
                    </tr>
                    <tr className="font-weight-bold">
                      <td colSpan={5}>GRAND TOTAL</td>
                      <td colSpan={2}>
                        Rp.{" "}
                        {numberWithCommas(
                          totalNettoSummary - totalCompanyCostSummary
                        )}
                        <br />
                        <small>
                          Rp.{" "}
                          {numberWithCommas(
                            totalRealNettoSummary - totalCompanyCostSummary
                          )}
                        </small>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DetailReportModal
          modalToggle={this.state.modalDetailToggle}
          handleClose={() => this.setState({ modalDetailToggle: false })}
          choosenDetailReport={this.state.choosenDetailReport}
          detailTotalPaymentSummary={this.state.detailTotalPaymentSummary}
          detailTotalTotalCostSummary={this.state.detailTotalTotalCostSummary}
          detailTotalNettoSummary={this.state.detailTotalNettoSummary}
        />
        <DetailCompanyCostReportModal
          modalToggle={this.state.modalDetailCompanyCostToggle}
          handleClose={() =>
            this.setState({ modalDetailCompanyCostToggle: false })
          }
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  getReportLoading: state.ReportReducer.getReportLoading,
  getReportResult: state.ReportReducer.getReportResult,
  getReportError: state.ReportReducer.getReportError,

  getDetailReportLoading: state.ReportReducer.getDetailReportLoading,
  getDetailReportResult: state.ReportReducer.getDetailReportResult,
  getDetailReportError: state.ReportReducer.getDetailReportError,

  getCompanyCostLoading: state.CompanyCostReducer.getCompanyCostLoading,
  getCompanyCostResult: state.CompanyCostReducer.getCompanyCostResult,
  getCompanyCostError: state.CompanyCostReducer.getCompanyCostError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});
export default connect(mapStateToProps, null)(ReportList);
