import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import {
  getTransactionList,
  deleteTransaction,
  addTransaction,
  getDetailTransactionByCode,
  editTransaction,
} from "../../actions/transaction/TransactionAction";
import SearchByCodeTransactionModal from "components/Modal/transaction/SearchByCodeTransactionModal";
import moment from "moment";
import "moment/locale/id";
import { numberWithCommas } from "utils";
import DetailTransactionModal from "components/Modal/transaction/DetailTransactionModal";
import { SearchComponent } from "components/Table";

class ActiveTransactionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      modalAddToggle: false,
      modalEndToggle: false,
      modalDetailToggle: false,
      modalChangeToggle: false,
      searchedText: "",
      keyword: "",
      accessToken: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
    document.addEventListener("keydown", this.onKeyPressed.bind(this));
  }

  componentDidUpdate(prevProps) {
    const {
      deleteTransactionResult,
      deleteTransactionError,
      getTransactionError,
      refreshTokenError,
      refreshTokenResult,
      addTransactionError,
      addTransactionResult,
      endTransactionResult,
      endTransactionError,
      getDetailTransactionByCodeResult,
      getDetailTransactionByCodeError,
      editTransactionResult,
      editTransactionError,
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
      this.props.dispatch(
        getTransactionList(refreshTokenResult.accessToken, false)
      );
    }

    if (
      addTransactionResult &&
      prevProps.addTransactionResult !== addTransactionResult
    ) {
      this.props.history.push(
        "/admin/transaction/edit/" + addTransactionResult.data.id
      );
    }
    if (
      addTransactionError &&
      prevProps.addTransactionError !== addTransactionError
    ) {
      swal("Error!", addTransactionError.message, "error").then((result) => {
        this.setState({ modalAddToggle: true, code: "" });
      });
    }

    if (
      endTransactionResult &&
      prevProps.endTransactionResult !== endTransactionResult
    ) {
      swal("Success!", endTransactionResult.message, "success");
      this.setState({ modalDetailToggle: false, code: "" });
      this.props.dispatch(getTransactionList(this.state.accessToken, false));
    }

    if (
      endTransactionError &&
      prevProps.endTransactionError !== endTransactionError
    ) {
      swal("Error!", endTransactionError.message, "error").then((result) => {
        this.setState({ modalEndToggle: false, code: "" });
      });
    }

    if (
      getTransactionError &&
      prevProps.getTransactionError !== getTransactionError
    ) {
      swal("Error!", getTransactionError.message, "error");
      this.props.history.push("/admin/dashboard");
    }
    if (
      deleteTransactionResult &&
      prevProps.deleteTransactionResult !== deleteTransactionResult
    ) {
      swal("Success!", deleteTransactionResult.message, "success");
      this.props.dispatch(getTransactionList(this.state.accessToken, false));
    }
    if (
      deleteTransactionError &&
      prevProps.deleteTransactionError !== deleteTransactionError
    ) {
      swal("Error!", deleteTransactionError.message, "error");
    }

    if (
      getDetailTransactionByCodeError &&
      prevProps.getDetailTransactionByCodeError !==
        getDetailTransactionByCodeError
    ) {
      swal("Error!", getDetailTransactionByCodeError.message, "error");
    }

    if (
      getDetailTransactionByCodeResult &&
      prevProps.getDetailTransactionByCodeResult !==
        getDetailTransactionByCodeResult
    ) {
      this.setState({
        modalEndToggle: false,
        modalDetailToggle: true,
      });
    }

    if (
      editTransactionResult &&
      prevProps.editTransactionResult !== editTransactionResult
    ) {
      swal("Success!", editTransactionResult.message, "success");
      this.props.dispatch(getTransactionList(this.state.accessToken, false));
    }
    if (
      editTransactionError &&
      prevProps.editTransactionError !== editTransactionError
    ) {
      swal("Error!", editTransactionError.message, "error");
    }
  }

  handleAddSubmit = (event) => {
    const { code, accessToken } = this.state;
    event.preventDefault();
    this.setState({ modalAddToggle: false });
    this.props.dispatch(addTransaction(accessToken, code));
  };

  handleGetTransascationEndSubmit = (event) => {
    const { code, accessToken } = this.state;
    event.preventDefault();
    this.setState({ modalEndToggle: false });
    this.props.dispatch(getDetailTransactionByCode(accessToken, code));
  };

  handleChangeSubmit = (event) => {
    const { code, accessToken, id } = this.state;
    event.preventDefault();
    this.setState({ modalChangeToggle: false });

    this.props.dispatch(editTransaction(accessToken, { id, code }));
  };

  onKeyPressed = (e) => {
    if (e.key === "F1") {
      this.setState({
        modalAddToggle: true,
      });
    } else if (e.key === "F9") {
      this.setState({
        modalEndToggle: true,
      });
    } else if (e.key === "F2") {
      this.props.dispatch(refreshToken());
    }
  };

  deleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete data success",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch(deleteTransaction(this.state.accessToken, id));
      }
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  filterHandleSubmit = (event) => {
    const { keyword } = this.state;
    event.preventDefault();
    this.setState({ searchedText: keyword });
  };

  render() {
    const {
      modalAddToggle,
      modalEndToggle,
      accessToken,
      modalDetailToggle,
      modalChangeToggle,
      keyword,
      searchedText,
    } = this.state;
    const { getTransactionLoading, getTransactionResult } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Active Transactions</CardTitle>
                <Row>
                  <Col>
                    <Button
                      className="btn btn-primary float-right"
                      onClick={() => {
                        this.setState({
                          modalEndToggle: true,
                        });
                      }}>
                      End (F9)
                    </Button>
                    <Button
                      className="btn btn-success float-right"
                      onClick={() => {
                        this.setState({
                          modalAddToggle: true,
                        });
                      }}>
                      Add (F1)
                    </Button>
                    <Button
                      className="btn btn-info float-left"
                      onClick={() => {
                        this.props.dispatch(refreshToken());
                      }}>
                      Refresh (F2)
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SearchComponent
                      keyword={keyword}
                      searchedText={searchedText}
                      keywordHandleSubmit={this.filterHandleSubmit}
                      handleChange={this.handleChange}
                    />
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
                      <th width="20%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getTransactionResult ? (
                      getTransactionResult.data
                        .filter((transaction) =>
                          transaction.customer
                            ? transaction.ownership.code
                                .toLowerCase()
                                .includes(searchedText.toLowerCase()) ||
                              transaction.customer.name
                                .toLowerCase()
                                .includes(searchedText.toLowerCase())
                            : transaction.note
                            ? transaction.ownership.code
                                .toLowerCase()
                                .includes(searchedText.toLowerCase()) ||
                              transaction.note
                                .toLowerCase()
                                .includes(searchedText.toLowerCase())
                            : true
                        )
                        .map((transaction, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
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
                                        transaction.total ||
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
                                className="btn btn-warning mr-2 mb-2"
                                to={
                                  "/admin/transaction/edit/" + transaction.id
                                }>
                                <i className="nc-icon nc-ruler-pencil"></i> Edit
                              </Link>
                              {transaction.time_out ? (
                                ""
                              ) : (
                                <>
                                  <Button
                                    color="danger"
                                    className="mr-2 mb-2"
                                    onClick={() =>
                                      this.deleteData(transaction.id)
                                    }>
                                    <i className="nc-icon nc-basket"></i> Delete
                                  </Button>
                                  <Button
                                    color="primary"
                                    className="mr-2 mb-2"
                                    onClick={() =>
                                      this.props.dispatch(
                                        getDetailTransactionByCode(
                                          accessToken,
                                          transaction.ownership.code
                                        )
                                      )
                                    }>
                                    <i className="nc-icon nc-check-2"></i> End
                                  </Button>
                                  <Button
                                    color="secondary"
                                    className="mr-2 mb-2"
                                    onClick={() => {
                                      this.setState({
                                        modalChangeToggle: true,
                                        id: transaction.id,
                                      });
                                    }}>
                                    <i className="nc-icon nc-refresh-69"></i>{" "}
                                    Change
                                  </Button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))
                    ) : getTransactionLoading ? (
                      <tr>
                        <td colSpan={8} align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={8} align="center">
                          There are no data..
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <SearchByCodeTransactionModal
          title="Add Transaction"
          modalToggle={modalAddToggle}
          handleClose={() => this.setState({ modalAddToggle: false })}
          accessToken={accessToken}
          handleSubmit={this.handleAddSubmit}
          handleChange={this.handleChange}
        />
        <SearchByCodeTransactionModal
          title="End Transaction"
          modalToggle={modalEndToggle}
          handleClose={() => this.setState({ modalEndToggle: false })}
          accessToken={accessToken}
          handleSubmit={this.handleGetTransascationEndSubmit}
          handleChange={this.handleChange}
        />
        <SearchByCodeTransactionModal
          title="Change Vehicle"
          modalToggle={modalChangeToggle}
          handleClose={() => this.setState({ modalChangeToggle: false })}
          accessToken={accessToken}
          handleSubmit={this.handleChangeSubmit}
          handleChange={this.handleChange}
        />
        <DetailTransactionModal
          accessToken={accessToken}
          modalToggle={modalDetailToggle}
          handleClose={() => this.setState({ modalDetailToggle: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getTransactionLoading: state.TransactionReducer.getTransactionLoading,
  getTransactionResult: state.TransactionReducer.getTransactionResult,
  getTransactionError: state.TransactionReducer.getTransactionError,

  getDetailTransactionByCodeLoading:
    state.TransactionReducer.getDetailTransactionByCodeLoading,
  getDetailTransactionByCodeResult:
    state.TransactionReducer.getDetailTransactionByCodeResult,
  getDetailTransactionByCodeError:
    state.TransactionReducer.getDetailTransactionByCodeError,

  addTransactionLoading: state.TransactionReducer.addTransactionLoading,
  addTransactionResult: state.TransactionReducer.addTransactionResult,
  addTransactionError: state.TransactionReducer.addTransactionError,

  editTransactionLoading: state.TransactionReducer.editTransactionLoading,
  editTransactionResult: state.TransactionReducer.editTransactionResult,
  editTransactionError: state.TransactionReducer.editTransactionError,

  endTransactionLoading: state.TransactionReducer.endTransactionLoading,
  endTransactionResult: state.TransactionReducer.endTransactionResult,
  endTransactionError: state.TransactionReducer.endTransactionError,

  deleteTransactionLoading: state.TransactionReducer.deleteTransactionLoading,
  deleteTransactionResult: state.TransactionReducer.deleteTransactionResult,
  deleteTransactionError: state.TransactionReducer.deleteTransactionError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(ActiveTransactionList);
