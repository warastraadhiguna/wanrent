import { refreshToken } from "actions/AuthAction";
import { getBrandList } from "actions/brand/BrandAction";
import { getTypeList } from "actions/type/TypeAction";
import {
  getDetailTransaction,
  editTransaction,
} from "actions/transaction/TransactionAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import swal from "sweetalert";
import moment from "moment";
import "moment/locale/id";
import OwnershipDetailModal from "components/Modal/OwnershipDetailModal";
import { getCustomerList } from "actions/customer/CustomerAction";
import ChooseCustomerModal from "components/Modal/customer/ChooseCustomerModal";
import { numberWithCommas } from "utils";
import { deletePayment } from "actions/payment/PaymentAction";
import AddPaymentModal from "components/Modal/payment/AddPaymentModal";
import CustomerDetailModal from "components/Modal/CustomerDetailModal";
import { getPaymentList } from "actions/payment/PaymentAction";

class EditTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      modalAddToggle: false,
      modalOwnershipDetailToggle: false,
      modalChooseCustomerToggle: false,
      modalCustomerDetailToggle: false,
      id_ownership: "",
      id_customer: "",
      time_in: "",
      time_out: "",
      totalTimeString: "",
      note: "",
      accessToken: "",
      total: "",
      total_payments: "",
      payments: false,
      customer: false,
      ownership: {
        id: "",
        code: "",
        licence_plate: "",
        url: "",
        supplier: [],
        vehicle: {
          id: "",
          detail_type: "",
          type: [],
          brand: [],
        },
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.dispatch(editTransaction(this.state.accessToken, this.state));
  };

  chooseCustomer = (id, nameAndPhone) => {
    this.setState({
      id_customer: id,
      customer: {
        id: id,
        name: nameAndPhone,
      },
    });
  };

  deleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch(deletePayment(this.state.accessToken, id));
      }
    });
  };

  componentDidUpdate(prevProps) {
    const {
      editTransactionResult,
      editTransactionError,
      getDetailTransactionResult,
      getDetailTransactionError,
      refreshTokenError,
      refreshTokenResult,
      getBrandResult,
      getBrandError,
      getTypeResult,
      getTypeError,
      deletePaymentResult,
      deletePaymentError,
      addPaymentResult,
      addPaymentError,
      getPaymentResult,
      getPaymentError,
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
      this.props.dispatch(getBrandList(refreshTokenResult.accessToken));
      this.props.dispatch(getTypeList(refreshTokenResult.accessToken));
      this.props.dispatch(
        getDetailTransaction(
          refreshTokenResult.accessToken,
          this.props.match.params.id
        )
      );
      this.props.dispatch(getCustomerList(refreshTokenResult.accessToken));
      this.props.dispatch(
        getPaymentList(
          refreshTokenResult.accessToken,
          this.props.match.params.id
        )
      );
    }

    if (getBrandResult && prevProps.getBrandResult !== getBrandResult) {
      if (getBrandResult.data.length === 0) {
        swal("Error!", "Input Brand First", "error");
        this.props.history.push("/admin/dashboard");
      }
    }

    if (getBrandError && prevProps.getBrandError !== getBrandError) {
      swal("Error!", getBrandError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (getTypeResult && prevProps.getTypeResult !== getTypeResult) {
      if (getTypeResult.data.length === 0) {
        swal("Error!", "Input Type First", "error");
        this.props.history.push("/admin/dashboard");
      }
    }

    if (getTypeError && prevProps.getTypeError !== getTypeError) {
      swal("Error!", getTypeError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (
      getDetailTransactionResult &&
      prevProps.getDetailTransactionResult !== getDetailTransactionResult
    ) {
      if (!getDetailTransactionResult.data) {
        swal("Error!", "No data available", "error");
        this.props.history.push("/admin/dashboard");
      } else {
        this.setState({
          id_ownership: getDetailTransactionResult.data.id_ownership,
          ownership: getDetailTransactionResult.data.ownership,
          note: getDetailTransactionResult.data.note,
          time_in: getDetailTransactionResult.data.time_in,
          time_out: getDetailTransactionResult.data.time_out,
          customer: getDetailTransactionResult.data.customer,
          total: getDetailTransactionResult.data.total,
          totalTimeString: getDetailTransactionResult.data.totalTimeString,
          total_payments: getDetailTransactionResult.data.total_payments,
          id_customer: getDetailTransactionResult.data.customer
            ? getDetailTransactionResult.data.customer.id
            : "",
        });
      }
    }

    if (getPaymentResult && prevProps.getPaymentResult !== getPaymentResult) {
      this.setState({ payments: getPaymentResult.data });
    }

    if (getPaymentError && prevProps.getPaymentError !== getPaymentError) {
      swal("Error!", getPaymentError.message, "error");
    }

    if (
      getDetailTransactionError &&
      prevProps.getDetailTransactionError !== getDetailTransactionError
    ) {
      swal("Error!", getDetailTransactionError.message, "error");
    }
    if (
      editTransactionResult &&
      prevProps.editTransactionResult !== editTransactionResult
    ) {
      swal("Success!", editTransactionResult.message, "success");
      this.props.history.push("/admin/active-transactions");
    }
    if (
      editTransactionError &&
      prevProps.editTransactionError !== editTransactionError
    ) {
      swal("Error!", editTransactionError.message, "error");
    }

    if (
      deletePaymentResult &&
      prevProps.deletePaymentResult !== deletePaymentResult
    ) {
      swal("Success!", deletePaymentResult.message, "success");
      this.props.dispatch(refreshToken());
    }
    if (
      deletePaymentError &&
      prevProps.deletePaymentError !== deletePaymentError
    ) {
      swal("Error!", deletePaymentError.message, "error");
    }

    if (addPaymentResult && prevProps.addPaymentResult !== addPaymentResult) {
      if (addPaymentResult.message) {
        swal("Sucess!", addPaymentResult.message, "success");
        this.props.history.push("/admin/active-transactions");
      } else this.props.dispatch(refreshToken());
    }

    if (addPaymentError && prevProps.addPaymentError !== addPaymentError) {
      swal("Error!", addPaymentError.message, "error");
    }
  }

  render() {
    const {
      id,
      ownership,
      customer,
      time_in,
      time_out,
      note,
      modalOwnershipDetailToggle,
      modalChooseCustomerToggle,
      modalCustomerDetailToggle,
      accessToken,
      payments,
      total,
      total_payments,
      modalAddToggle,
      totalTimeString,
    } = this.state;
    const { editTransactionLoading, deletePaymentLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Edit Transaction</CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Vehicle</label>
                        <InputGroup>
                          <Input
                            type="text"
                            value={ownership.code}
                            name="code"
                            disabled
                          />
                          <InputGroupAddon
                            title="Info"
                            addonType="append"
                            onClick={() => {
                              this.setState({
                                modalOwnershipDetailToggle: true,
                              });
                            }}
                          >
                            <InputGroupText className="bg-info text-dark">
                              <i className="nc-icon nc-alert-circle-i ml-2" />
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <label>Customer</label>
                        <InputGroup>
                          <Input
                            type="text"
                            value={customer ? customer.name : ""}
                            name="code"
                            disabled
                          />
                          {time_out ? (
                            <InputGroupAddon
                              title="Search"
                              addonType="append"
                              onClick={() => {
                                this.setState({
                                  modalCustomerDetailToggle: true,
                                });
                              }}
                            >
                              <InputGroupText className="bg-info text-dark">
                                <i className="nc-icon nc-alert-circle-i ml-2" />
                              </InputGroupText>
                            </InputGroupAddon>
                          ) : (
                            <InputGroupAddon
                              title="Search"
                              addonType="append"
                              onClick={() => {
                                this.setState({
                                  modalChooseCustomerToggle: true,
                                });
                              }}
                            >
                              <InputGroupText className="bg-warning text-dark">
                                <i className="nc-icon nc-zoom-split ml-2" />
                              </InputGroupText>
                            </InputGroupAddon>
                          )}
                        </InputGroup>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Time In</label>
                        <Input
                          type="text"
                          value={moment(time_in).format(
                            "dddd, DD MMMM YYYY HH:mm:ss"
                          )}
                          name="time_in"
                          disabled
                        />
                      </FormGroup>
                    </Col>

                    <Col md={6}>
                      <FormGroup>
                        <label>Note</label>
                        <Input
                          type="textarea"
                          value={note ? note : ""}
                          name="note"
                          onChange={(event) => this.handleChange(event)}
                          disabled={time_out}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  {time_out && (
                    <>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Time Out</label>
                            <Input
                              type="text"
                              value={moment(time_out).format(
                                "dddd, DD MMMM YYYY HH:mm:ss"
                              )}
                              name="time_in"
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Time Total</label>
                            <Input
                              type="text"
                              value={totalTimeString}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <label>Total</label>
                            <Input
                              type="text"
                              value={"Rp " + numberWithCommas(total)}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <label>Unpaid</label>
                            <Input
                              type="text"
                              value={
                                "Rp " + numberWithCommas(total - total_payments)
                              }
                              disabled
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  )}

                  <Row>
                    <Col>
                      {editTransactionLoading ? (
                        <Button color="primary" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <>
                          {!time_out && <Button color="primary">Submit</Button>}
                          <Link
                            to="/admin/active-transactions"
                            className="btn btn-warning"
                          >
                            Kembali
                          </Link>
                        </>
                      )}
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {time_out && (
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Payments</CardTitle>
                  <Button
                    className="btn btn-success float-right"
                    onClick={() => {
                      this.setState({
                        modalAddToggle: true,
                      });
                    }}
                  >
                    Add Payment
                  </Button>
                </CardHeader>
                <CardBody>
                  <Table>
                    <thead className="text-primary">
                      <tr>
                        <th width="5%">No</th>
                        <th>Time</th>
                        <th>Total</th>
                        <th width="20%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments ? (
                        payments.map((payment, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {moment(payment.createdAt).format(
                                "dddd, DD MMMM YYYY HH:mm:ss"
                              )}
                            </td>
                            <td>{numberWithCommas(payment.total)}</td>
                            <td align="center">
                              <Button
                                color="danger"
                                className="ml-2"
                                disabled={deletePaymentLoading}
                                onClick={() => this.deleteData(payment.id)}
                              >
                                <i className="nc-icon nc-basket"></i> Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : payments ? (
                        <tr>
                          <td colSpan={4} align="center">
                            <Spinner color="primary" />
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td colSpan={4} align="center">
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
        )}

        <OwnershipDetailModal
          modalToggle={modalOwnershipDetailToggle}
          ownership={ownership}
          handleClose={() =>
            this.setState({ modalOwnershipDetailToggle: false })
          }
        />
        <ChooseCustomerModal
          modalToggle={modalChooseCustomerToggle}
          handleClose={() =>
            this.setState({ modalChooseCustomerToggle: false })
          }
          chooseCustomer={this.chooseCustomer}
          accessToken={accessToken}
        />
        <CustomerDetailModal
          modalToggle={modalCustomerDetailToggle}
          customer={customer}
          handleClose={() =>
            this.setState({ modalCustomerDetailToggle: false })
          }
        />
        <AddPaymentModal
          modalToggle={modalAddToggle}
          handleClose={() => this.setState({ modalAddToggle: false })}
          accessToken={accessToken}
          idTransaction={id}
          unpaid={total - (total_payments ? total_payments : 0)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getDetailTransactionLoading:
    state.TransactionReducer.getDetailTransactionLoading,
  getDetailTransactionResult:
    state.TransactionReducer.getDetailTransactionResult,
  getDetailTransactionError: state.TransactionReducer.getDetailTransactionError,

  getCustomerLoading: state.CustomerReducer.getCustomerLoading,
  getCustomerResult: state.CustomerReducer.getCustomerResult,
  getCustomerError: state.CustomerReducer.getCustomerError,

  editTransactionLoading: state.TransactionReducer.editTransactionLoading,
  editTransactionResult: state.TransactionReducer.editTransactionResult,
  editTransactionError: state.TransactionReducer.editTransactionError,

  deletePaymentLoading: state.PaymentReducer.deletePaymentLoading,
  deletePaymentResult: state.PaymentReducer.deletePaymentResult,
  deletePaymentError: state.PaymentReducer.deletePaymentError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,

  addPaymentResult: state.PaymentReducer.addPaymentResult,
  addPaymentError: state.PaymentReducer.addPaymentError,

  getPaymentResult: state.PaymentReducer.getPaymentResult,
  getPaymentError: state.PaymentReducer.getPaymentError,
  getPaymentLoading: state.PaymentReducer.getPaymentLoading,
});

export default connect(mapStateToProps, null)(EditTransaction);
