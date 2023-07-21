import React, { Component } from "react";
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
import { connect } from "react-redux";
import swal from "sweetalert";
import { refreshToken } from "actions/AuthAction";
import { getTransactionList } from "../../actions/transaction/TransactionAction";

import moment from "moment";
import "moment/locale/id";
import { numberWithCommas } from "utils";
import { Link } from "react-router-dom";
import { SearchComponent } from "components/Table";
import { PaginationComponent } from "components/Table";
import { DateComponent } from "components/Table/DateComponent";
import TransactionSummaryModal from "components/Modal/transaction/TransactionSummaryModal";

class TransactionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: "",
      modalSummaryToggle: false,

      searchedText: "",
      keyword: "",
      totalData: 0,
      currentPage: 0,
      pageSize: 10,
      pagesCount: 0,
      startDate: "",
      endDate: "",
      isDateFilterChanged: false,

      totalSummary: 0,
      paidSummary: 0,
      unpaidSummary: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      getTransactionError,
      refreshTokenError,
      refreshTokenResult,
      getTransactionResult,
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

    if (
      getTransactionResult &&
      prevProps.getTransactionResult !== getTransactionResult
    ) {
      this.setState({
        pagesCount: Math.ceil(
          getTransactionResult.data.length / this.state.pageSize
        ),
        totalData: getTransactionResult.data.length,
        isDateFilterChanged: false,
      });

      let totalSummary = 0;
      let paidSummary = 0;
      let unpaidSummary = 0;
      getTransactionResult.data.map((transaction) => {
        totalSummary = totalSummary + parseInt(transaction.total);
        paidSummary = paidSummary + parseInt(transaction.total_payments);
        unpaidSummary =
          unpaidSummary +
          (parseInt(transaction.total) - parseInt(transaction.total_payments));

        return 0;
      });

      this.setState({
        totalSummary,
        paidSummary,
        unpaidSummary,
      });
    }

    if (
      getTransactionError &&
      prevProps.getTransactionError !== getTransactionError
    ) {
      swal("Error!", getTransactionError.message, "error");
      this.props.history.push("/admin/dashboard");
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClick = (e, index) => {
    e.preventDefault();
    this.setState({
      currentPage: index,
    });
  };

  filterHandleSubmit = (event) => {
    const { keyword, accessToken } = this.state;
    event.preventDefault();
    this.setState({ searchedText: keyword });
    this.getData(accessToken);
  };

  getData = (accessToken) => {
    const { keyword, startDate, endDate } = this.state;
    const startDateInput = startDate
      ? startDate
      : moment(new Date()).format("YYYY/MM/DD");
    const endDateInput = endDate
      ? endDate
      : moment(new Date()).format("YYYY/MM/DD");

    this.props.dispatch(
      getTransactionList(accessToken, true, {
        searchedText: keyword,
        startDate: startDateInput,
        endDate: endDateInput,
      })
    );
  };

  setIsDateFilterChanged = (isDateFilterChanged) => {
    this.setState({ isDateFilterChanged });
  };

  render() {
    const {
      currentPage,
      pagesCount,
      totalData,
      pageSize,
      keyword,
      searchedText,
      startDate,
      endDate,
      isDateFilterChanged,
      modalSummaryToggle,
      totalSummary,
      paidSummary,
      unpaidSummary,
    } = this.state;
    const { getTransactionLoading, getTransactionResult } = this.props;

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Data Transaction</CardTitle>
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
                  <Col>
                    <SearchComponent
                      keyword={keyword}
                      searchedText={searchedText}
                      keywordHandleSubmit={this.filterHandleSubmit}
                      handleChange={this.handleChange}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      className="btn btn-secondary float-right"
                      onClick={() => {
                        this.setState({
                          modalSummaryToggle: true,
                        });
                      }}
                    >
                      Summary
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th width="5%">No</th>
                      <th>Info</th>
                      <th>Time</th>
                      <th>Payment</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTransactionResult &&
                    getTransactionResult.data.length > 0 ? (
                      getTransactionResult.data
                        .slice(
                          currentPage * pageSize,
                          (currentPage + 1) * pageSize
                        )
                        .map((transaction, index) => (
                          <tr key={index}>
                            <td>{currentPage * pageSize + index + 1}</td>
                            <td>
                              <Table borderless>
                                <tbody>
                                  <tr>
                                    <td>Code</td>
                                    <td>:</td>
                                    <td>
                                      {transaction.ownership &&
                                        transaction.ownership.code}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Customer</td>
                                    <td>:</td>
                                    <td>
                                      {transaction.customer &&
                                        transaction.customer.name}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Note</td>
                                    <td>:</td>
                                    <td>
                                      {transaction.note && transaction.note}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>User</td>
                                    <td>:</td>
                                    <td>{transaction.user.name}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </td>
                            <td>
                              <Table borderless>
                                <tbody>
                                  <tr>
                                    <td>Time In</td>
                                    <td>:</td>
                                    <td>
                                      {moment(transaction.time_in).format(
                                        "dddd, DD MMMM YYYY HH:mm:ss"
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Time Out</td>
                                    <td>:</td>
                                    <td>
                                      {transaction.time_out
                                        ? moment(transaction.time_out).format(
                                            "dddd, DD MMMM YYYY HH:mm:ss"
                                          )
                                        : " -"}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Total Time</td>
                                    <td>:</td>
                                    <td>{transaction.totalTimeString}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </td>
                            <td>
                              {" "}
                              <Table borderless>
                                <tbody>
                                  <tr>
                                    <td>Total</td>
                                    <td>:</td>
                                    <td>
                                      {numberWithCommas(transaction.total)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Paid</td>
                                    <td>:</td>
                                    <td>
                                      {numberWithCommas(
                                        transaction.total_payments
                                          ? transaction.total_payments
                                          : 0
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Unpaid</td>
                                    <td>:</td>
                                    <td>
                                      {numberWithCommas(
                                        transaction.total_payments
                                          ? transaction.total -
                                              transaction.total_payments
                                          : 0
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </td>
                            <td align="center">
                              <Link
                                className="btn btn-info mr-2 mb-2"
                                to={
                                  "/admin/detail-transaction/" + transaction.id
                                }
                              >
                                <i className="nc-icon  nc-single-copy-04"></i>{" "}
                                Detail
                              </Link>
                            </td>
                          </tr>
                        ))
                    ) : getTransactionLoading ? (
                      <tr>
                        <td colSpan={5} align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={5} align="center">
                          Data is not available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
                <br />
                <PaginationComponent
                  currentPage={currentPage}
                  pagesCount={pagesCount}
                  totalData={totalData}
                  pageSize={pageSize}
                  handleClick={this.handleClick}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <TransactionSummaryModal
          modalToggle={modalSummaryToggle}
          handleClose={() => this.setState({ modalSummaryToggle: false })}
          totalSummary={totalSummary}
          paidSummary={paidSummary}
          unpaidSummary={unpaidSummary}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getTransactionLoading: state.TransactionReducer.getTransactionLoading,
  getTransactionResult: state.TransactionReducer.getTransactionResult,
  getTransactionError: state.TransactionReducer.getTransactionError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(TransactionList);
