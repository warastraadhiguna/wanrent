import { refreshToken } from "actions/AuthAction";
import { deletePersonalDebt } from "actions/personalDebt/PersonalDebtAction";
import { addPersonalDebt } from "actions/personalDebt/PersonalDebtAction";
import { getPersonalDebtList } from "actions/personalDebt/PersonalDebtAction";
import { deletePersonalDebtPayment } from "actions/personalDebtPayment/PersonalDebtPaymentAction";
import { addPersonalDebtPayment } from "actions/personalDebtPayment/PersonalDebtPaymentAction";
import { getPersonalDebtPaymentList } from "actions/personalDebtPayment/PersonalDebtPaymentAction";
import { getSupplierList } from "actions/supplier/SupplierAction";
import DebtSummaryModal from "components/Modal/DebtSummaryModal";
import PayPaymentModal from "components/Modal/PayPaymentModal";
import { AddPersonalDebtModal } from "components/Modal/personalDebt/AddPersonalDebtModal";
import PersonalDebtPaymentListModal from "components/Modal/personalDebtPayment/PersonalDebtPaymentListModal";
import { PaginationComponent } from "components/Table";
import { SearchComponent } from "components/Table";
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

export class PersonalDebtList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: "",
      modalAddPersonalDebtToggle: false,
      modalSummaryToggle: false,
      modalPaymentToggle: false,
      addModalToggle: false,
      choosenPersonalDebt: false,
      totalDebtByName: 0,
      totalPaymentByName: 0,
      totalAddPayment: 0,

      searchedText: "",
      keyword: "",
      totalData: 0,
      currentPage: 0,
      pageSize: 10,
      pagesCount: 0,
      startDate: new Date(new Date().getFullYear(), 0, 1, 0, 0, 0, 0),
      endDate: "",
      isDateFilterChanged: false,

      id_supplier: "",
      total: 0,
      note: "",
      personal_debt_date: "",
      totalDebt: 0,
      totalPaid: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      getPersonalDebtError,
      refreshTokenError,
      refreshTokenResult,
      getPersonalDebtResult,
      deletePersonalDebtResult,
      deletePersonalDebtError,
      addPersonalDebtResult,
      addPersonalDebtError,
      getSupplierResult,
      getSupplierError,
      addPersonalDebtPaymentResult,
      addPersonalDebtPaymentError,
      deletePersonalDebtPaymentResult,
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
      this.props.dispatch(getSupplierList(refreshTokenResult.accessToken));
    }

    if (
      getPersonalDebtResult &&
      prevProps.getPersonalDebtResult !== getPersonalDebtResult
    ) {
      this.setState({
        pagesCount: Math.ceil(
          getPersonalDebtResult.data.length / this.state.pageSize
        ),
        totalData: getPersonalDebtResult.data.length,
        isDateFilterChanged: false,
      });

      let totalDebt = 0;
      let totalPaid = 0;

      getPersonalDebtResult.data.map((debt) => {
        totalDebt = totalDebt + debt.total;
        totalPaid =
          totalPaid + parseInt(debt.total_payments ? debt.total_payments : 0);

        return 0;
      });

      this.setState({
        totalDebt,
        totalPaid,
      });
    }

    if (
      getSupplierResult &&
      prevProps.getSupplierResult !== getSupplierResult
    ) {
      if (getSupplierResult.data.length === 0) {
        swal("Error!", "Input Supplier First", "error");
        this.props.history.push("/admin/dashboard");
      } else this.setState({ id_supplier: getSupplierResult.data[0].id });
    }

    if (getSupplierError && prevProps.getSupplierError !== getSupplierError) {
      swal("Error!", getSupplierError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (
      getPersonalDebtError &&
      prevProps.getPersonalDebtError !== getPersonalDebtError
    ) {
      swal("Error!", getPersonalDebtError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (
      deletePersonalDebtResult &&
      prevProps.deletePersonalDebtResult !== deletePersonalDebtResult
    ) {
      swal("Success!", deletePersonalDebtResult.message, "success");
      this.props.dispatch(refreshToken());
    }
    if (
      deletePersonalDebtError &&
      prevProps.deletePersonalDebtError !== deletePersonalDebtError
    ) {
      swal("Error!", deletePersonalDebtError.message, "error");
    }

    if (
      addPersonalDebtResult &&
      prevProps.addPersonalDebtResult !== addPersonalDebtResult
    ) {
      swal("Success!", addPersonalDebtResult.message, "success");
      this.setState({
        id_supplier: "",
        total: 0,
        note: "",
        personal_debt_date: "",
      });
      this.props.dispatch(refreshToken());
    }

    if (
      addPersonalDebtError &&
      prevProps.addPersonalDebtError !== addPersonalDebtError
    ) {
      swal("Error!", addPersonalDebtError.message, "error");
    }

    if (
      addPersonalDebtPaymentResult &&
      prevProps.addPersonalDebtPaymentResult !== addPersonalDebtPaymentResult
    ) {
      swal("Sucess!", addPersonalDebtPaymentResult.message, "success");
      this.setState({
        modalPaymentToggle: false,
        addModalToggle: false,
        totalAddPayment: 0,
      });

      this.props.dispatch(refreshToken());
    }

    if (
      addPersonalDebtPaymentError &&
      prevProps.addPersonalDebtPaymentError !== addPersonalDebtPaymentError
    ) {
      swal("Error!", addPersonalDebtPaymentError.message, "error");
    }

    if (
      deletePersonalDebtPaymentResult &&
      prevProps.deletePersonalDebtPaymentResult !==
        deletePersonalDebtPaymentResult
    ) {
      this.setState({
        modalPaymentToggle: false,
      });
      swal("Success!", deletePersonalDebtPaymentResult.message, "success");
      this.props.dispatch(refreshToken());
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

    const filter = {
      searchedText: keyword,
      startDate: startDateInput,
      endDate: endDateInput,
    };

    this.props.dispatch(getPersonalDebtList(accessToken, filter));
    this.props.dispatch(getPersonalDebtPaymentList(accessToken, filter));
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
        this.props.dispatch(deletePersonalDebt(this.state.accessToken, id));
      }
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAddSubmit = (event) => {
    event.preventDefault();
    const { id_supplier, total, note, personal_debt_date, accessToken } =
      this.state;
    if (id_supplier && total && note && personal_debt_date) {
      this.props.dispatch(addPersonalDebt(accessToken, this.state));
      this.setState({ modalAddPersonalDebtToggle: false });
    } else {
      swal("Failed!", "Fill all fields!", "error");
    }
  };

  setIsDateFilterChanged = (isDateFilterChanged) => {
    this.setState({ isDateFilterChanged });
  };

  handlePersonalDebtPayment = (id, totalDebtByName, totalPaymentByName) => {
    const { getPersonalDebtPaymentResult } = this.props;

    const choosenPersonalDebt = getPersonalDebtPaymentResult.data.filter(
      (detail) => detail.id === id
    );

    this.setState({
      modalPaymentToggle: true,
      choosenPersonalDebt,
      totalDebtByName,
      totalPaymentByName,
      totalAddPayment: 0,
    });
  };

  handleAddPayment = (event) => {
    const {
      accessToken,
      totalDebtByName,
      totalAddPayment,
      totalPaymentByName,
      choosenPersonalDebt,
    } = this.state;

    event.preventDefault();

    if (
      parseInt(totalPaymentByName) + parseInt(totalAddPayment) >
      parseInt(totalDebtByName)
    ) {
      swal("Failed!", "Paid Value is Greater than The Debt!!!", "error");
      return;
    }

    const unpaid = totalDebtByName - totalPaymentByName;
    this.props.dispatch(
      addPersonalDebtPayment(accessToken, {
        idPersonalDebt: choosenPersonalDebt[0].id,
        total: totalAddPayment,
        unpaid,
      })
    );
  };

  handleDeletePaymentData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch(
          deletePersonalDebtPayment(this.state.accessToken, id)
        );
      }
    });
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
      modalAddPersonalDebtToggle,
      id_supplier,
      total,
      note,
      personal_debt_date,
      isDateFilterChanged,
      totalDebt,
      modalSummaryToggle,
      modalPaymentToggle,
      choosenPersonalDebt,
      totalPaymentByName,
      totalAddPayment,
      addModalToggle,
      totalPaid,
    } = this.state;
    const { getPersonalDebtLoading, getPersonalDebtResult } = this.props;

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Personal Debt List</CardTitle>
                <Row>
                  <Col md={4}>
                    <DateComponent
                      startDate={startDate}
                      endDate={endDate}
                      isDateFilterChanged={isDateFilterChanged}
                      setIsDateFilterChanged={this.setIsDateFilterChanged}
                      handleChange={this.handleChange}
                      filterHandleSubmit={this.filterHandleSubmit}
                      startDateFromFirstDate={true}
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
                      className="btn btn-success float-right"
                      onClick={() => {
                        this.setState({
                          modalAddPersonalDebtToggle: true,
                        });
                      }}
                    >
                      Add Personal Debt
                    </Button>
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
                      <th>Supplier</th>
                      <th>Detail</th>
                      <th>Payment</th>
                      <th width="15%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPersonalDebtResult &&
                    getPersonalDebtResult.data.length > 0 ? (
                      getPersonalDebtResult.data
                        .sort((a, b) =>
                          a.total - a.total_payments <
                          b.total - b.total_payments
                            ? 1
                            : -1
                        )
                        .slice(
                          currentPage * pageSize,
                          (currentPage + 1) * pageSize
                        )
                        .map((personalDebt, index) => (
                          <tr key={index}>
                            <td>{currentPage * pageSize + index + 1}</td>
                            <td>
                              <Table borderless>
                                <tbody>
                                  <tr>
                                    <td>Supplier</td>
                                    <td>:</td>
                                    <td>{personalDebt.supplier.name}</td>
                                  </tr>
                                  <tr>
                                    <td>Phone</td>
                                    <td>:</td>
                                    <td>{personalDebt.supplier.phone}</td>
                                  </tr>
                                  <tr>
                                    <td>Image</td>
                                    <td>:</td>
                                    <td>
                                      <img
                                        src={personalDebt.supplier.url}
                                        alt={personalDebt.supplier.url}
                                        width={100}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </td>
                            <td>
                              <Table borderless>
                                <tbody>
                                  <tr>
                                    <td>Date</td>
                                    <td>:</td>
                                    <td>
                                      {moment(
                                        personalDebt.personal_debt_date
                                      ).format("dddd, DD MMMM YYYY")}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Note</td>
                                    <td>:</td>
                                    <td>
                                      {personalDebt.note && personalDebt.note}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>User</td>
                                    <td>:</td>
                                    <td>{personalDebt.user.name}</td>
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
                                      {numberWithCommas(personalDebt.total)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Paid</td>
                                    <td>:</td>
                                    <td>
                                      {numberWithCommas(
                                        personalDebt.total_payments
                                          ? personalDebt.total_payments
                                          : 0
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Unpaid</td>
                                    <td>:</td>
                                    <td>
                                      {numberWithCommas(
                                        personalDebt.total ||
                                          personalDebt.total_payments
                                          ? personalDebt.total -
                                              personalDebt.total_payments
                                          : 0
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </td>
                            <td align="center">
                              {(personalDebt.total ||
                              personalDebt.total_payments
                                ? personalDebt.total -
                                  personalDebt.total_payments
                                : 0) !== 0 ? (
                                <>
                                  <Button
                                    className="btn btn-success mr-2 mb-2"
                                    onClick={() =>
                                      this.handlePersonalDebtPayment(
                                        personalDebt.id,
                                        personalDebt.total,
                                        personalDebt.total_payments
                                          ? personalDebt.total_payments
                                          : 0
                                      )
                                    }
                                  >
                                    <i className="nc-icon nc-credit-card"></i>{" "}
                                    Payments
                                  </Button>
                                  <Button
                                    color="danger"
                                    className="mr-2 mb-2"
                                    onClick={() =>
                                      this.deleteData(personalDebt.id)
                                    }
                                  >
                                    <i className="nc-icon nc-basket"></i> Delete
                                  </Button>
                                </>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                        ))
                    ) : getPersonalDebtLoading ? (
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
        <AddPersonalDebtModal
          modalToggle={modalAddPersonalDebtToggle}
          handleClose={() =>
            this.setState({ modalAddPersonalDebtToggle: false })
          }
          handleSubmit={this.handleAddSubmit}
          handleChange={this.handleChange}
          id_supplier={id_supplier}
          total={total}
          note={note}
          personal_debt_date={personal_debt_date}
        />
        <DebtSummaryModal
          modalToggle={modalSummaryToggle}
          handleClose={() => this.setState({ modalSummaryToggle: false })}
          title="Personal Debt Summary"
          totalDebt={totalDebt}
          totalPaid={totalPaid}
        />
        <PersonalDebtPaymentListModal
          modalToggle={modalPaymentToggle}
          handleClose={() => this.setState({ modalPaymentToggle: false })}
          addModalToggle={() => this.setState({ addModalToggle: true })}
          choosenPersonalDebt={choosenPersonalDebt}
          totalPaymentByName={totalPaymentByName}
          handleDeletePaymentData={this.handleDeletePaymentData}
        />
        <PayPaymentModal
          modalToggle={addModalToggle}
          handleClose={() => this.setState({ addModalToggle: false })}
          totalAddPayment={totalAddPayment}
          handleChange={this.handleChange}
          handleSubmit={this.handleAddPayment}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getPersonalDebtLoading: state.PersonalDebtReducer.getPersonalDebtLoading,
  getPersonalDebtResult: state.PersonalDebtReducer.getPersonalDebtResult,
  getPersonalDebtError: state.PersonalDebtReducer.getPersonalDebtError,

  getPersonalDebtPaymentLoading:
    state.PersonalDebtPaymentReducer.getPersonalDebtPaymentLoading,
  getPersonalDebtPaymentResult:
    state.PersonalDebtPaymentReducer.getPersonalDebtPaymentResult,
  getPersonalDebtPaymentError:
    state.PersonalDebtPaymentReducer.getPersonalDebtPaymentError,

  addPersonalDebtPaymentLoading:
    state.PersonalDebtPaymentReducer.addPersonalDebtPaymentLoading,
  addPersonalDebtPaymentResult:
    state.PersonalDebtPaymentReducer.addPersonalDebtPaymentResult,
  addPersonalDebtPaymentError:
    state.PersonalDebtPaymentReducer.addPersonalDebtPaymentError,

  deletePersonalDebtPaymentLoading:
    state.PersonalDebtPaymentReducer.deletePersonalDebtPaymentLoading,
  deletePersonalDebtPaymentResult:
    state.PersonalDebtPaymentReducer.deletePersonalDebtPaymentResult,
  deletePersonalDebtPaymentError:
    state.PersonalDebtPaymentReducer.deletePersonalDebtPaymentError,

  addPersonalDebtLoading: state.PersonalDebtReducer.addPersonalDebtLoading,
  addPersonalDebtResult: state.PersonalDebtReducer.addPersonalDebtResult,
  addPersonalDebtError: state.PersonalDebtReducer.addPersonalDebtError,

  deletePersonalDebtLoading:
    state.PersonalDebtReducer.deletePersonalDebtLoading,
  deletePersonalDebtResult: state.PersonalDebtReducer.deletePersonalDebtResult,
  deletePersonalDebtError: state.PersonalDebtReducer.deletePersonalDebtError,

  getSupplierLoading: state.SupplierReducer.getSupplierLoading,
  getSupplierResult: state.SupplierReducer.getSupplierResult,
  getSupplierError: state.SupplierReducer.getSupplierError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(PersonalDebtList);
