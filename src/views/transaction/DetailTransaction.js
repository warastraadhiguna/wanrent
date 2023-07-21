import { refreshToken } from "actions/AuthAction";
import React, { Component } from "react";
import { connect } from "react-redux";
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
import { numberWithCommas } from "utils";
import { getPaymentList } from "actions/payment/PaymentAction";
import { Link } from "react-router-dom";
import { getDetailTransaction } from "actions/transaction/TransactionAction";
import OwnershipDetailModal from "components/Modal/OwnershipDetailModal";
import CustomerDetailModal from "components/Modal/CustomerDetailModal";
import SplitPaymentModal from "components/Modal/payment/SplitPaymentModal";

class DetailTransaction extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      payments: false,
      accessToken: "",
      modalOwnershipDetailToggle: false,
      modalCustomerDetailToggle: false,
      transaction: false,

      modalSplitPaymentToggle: false,
      idPayment: "",
      totalPayment: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      refreshTokenError,
      refreshTokenResult,
      getPaymentResult,
      getPaymentError,
      getDetailTransactionResult,
      editPaymentResult,
      editPaymentError,
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
        getPaymentList(
          refreshTokenResult.accessToken,
          this.props.match.params.id
        )
      );
      this.props.dispatch(
        getDetailTransaction(
          refreshTokenResult.accessToken,
          this.props.match.params.id,
          false
        )
      );
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
          transaction: getDetailTransactionResult.data,
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
      editPaymentResult &&
      prevProps.editPaymentResult !== editPaymentResult
    ) {
      this.props.dispatch(refreshToken());
    }

    if (editPaymentError && prevProps.editPaymentError !== editPaymentError) {
      swal("Error!", editPaymentError.message, "error");
    }
  }

  splitPayment = (id, total) => {
    this.setState({
      idPayment: id,
      totalPayment: total,
      modalSplitPaymentToggle: true,
    });
  };

  render() {
    const { payments, transaction } = this.state;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Detail Transaction</CardTitle>
              </CardHeader>
              <CardBody>
                {transaction && (
                  <>
                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <label>Vehicle</label>
                          <InputGroup>
                            <Input
                              type="text"
                              value={transaction.ownership.code}
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
                              value={
                                transaction.customer
                                  ? transaction.customer.name
                                  : ""
                              }
                              name="code"
                              disabled
                            />
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
                            value={moment(transaction.time_in).format(
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
                            value={transaction.note ? transaction.note : ""}
                            name="note"
                            onChange={(event) => this.handleChange(event)}
                            disabled={transaction.time_out}
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6}>
                        <FormGroup>
                          <label>Time Out</label>
                          <Input
                            type="text"
                            value={moment(transaction.time_out).format(
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
                            value={transaction.totalTimeString}
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
                            value={"Rp " + numberWithCommas(transaction.total)}
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
                              "Rp " +
                              numberWithCommas(
                                transaction.total - transaction.total_payments
                              )
                            }
                            disabled
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Link
                          to="/admin/transactions"
                          className="btn btn-warning"
                        >
                          Kembali
                        </Link>
                      </Col>
                    </Row>
                  </>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Payments</CardTitle>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th width="5%">No</th>
                      <th>Time</th>
                      <th>Total</th>
                      <th>User</th>
                      <th width="10%">Action</th>
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
                          <td>{payment.user.name}</td>
                          <td align="center">
                            {" "}
                            <Button
                              color="danger"
                              // disabled={deletePaymentLoading}
                              onClick={() =>
                                this.splitPayment(payment.id, payment.total)
                              }
                            >
                              <i className="nc-icon nc-scissors"></i> Split
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
        <OwnershipDetailModal
          modalToggle={this.state.modalOwnershipDetailToggle}
          ownership={transaction ? transaction.ownership : null}
          handleClose={() =>
            this.setState({ modalOwnershipDetailToggle: false })
          }
        />
        <CustomerDetailModal
          modalToggle={this.state.modalCustomerDetailToggle}
          customer={transaction ? transaction.customer : null}
          handleClose={() =>
            this.setState({ modalCustomerDetailToggle: false })
          }
        />
        <SplitPaymentModal
          accessToken={this.state.accessToken}
          modalToggle={this.state.modalSplitPaymentToggle}
          idPayment={this.state.idPayment}
          currentTotal={this.state.totalPayment}
          handleClose={() => this.setState({ modalSplitPaymentToggle: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,

  getPaymentResult: state.PaymentReducer.getPaymentResult,
  getPaymentError: state.PaymentReducer.getPaymentError,
  getPaymentLoading: state.PaymentReducer.getPaymentLoading,

  editPaymentResult: state.PaymentReducer.editPaymentResult,
  editPaymentError: state.PaymentReducer.editPaymentError,
  editPaymentLoading: state.PaymentReducer.editPaymentLoading,

  getDetailTransactionLoading:
    state.TransactionReducer.getDetailTransactionLoading,
  getDetailTransactionResult:
    state.TransactionReducer.getDetailTransactionResult,
  getDetailTransactionError: state.TransactionReducer.getDetailTransactionError,
});

export default connect(mapStateToProps, null)(DetailTransaction);
