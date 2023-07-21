import { refreshToken } from "actions/AuthAction";
import { deletePersonalSaving } from "actions/personalSaving/PersonalSavingAction";
import { addPersonalSaving } from "actions/personalSaving/PersonalSavingAction";
import { getPersonalSavingList } from "actions/personalSaving/PersonalSavingAction";
import { deletePersonalSavingTaking } from "actions/personalSavingTaking/PersonalSavingTakingAction";
import { addPersonalSavingTaking } from "actions/personalSavingTaking/PersonalSavingTakingAction";
import { getPersonalSavingTakingList } from "actions/personalSavingTaking/PersonalSavingTakingAction";
import { getSupplierList } from "actions/supplier/SupplierAction";
import SavingSummaryModal from "components/Modal/SavingSummaryModal";
import TakeTakingModal from "components/Modal/TakeTakingModal";
import { AddPersonalSavingModal } from "components/Modal/personalSaving/AddPersonalSavingModal";
import PersonalSavingTakingListModal from "components/Modal/personalSavingTaking/PersonalSavingTakingListModal";
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

export class PersonalSavingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: "",
      modalAddPersonalSavingToggle: false,
      modalSummaryToggle: false,
      modalTakingToggle: false,
      addModalToggle: false,
      choosenPersonalSaving: false,
      totalSavingByName: 0,
      totalTakingByName: 0,
      totalAddTaking: 0,

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
      personal_saving_date: "",
      totalSaving: 0,
      totalTaken: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      getPersonalSavingError,
      refreshTokenError,
      refreshTokenResult,
      getPersonalSavingResult,
      deletePersonalSavingResult,
      deletePersonalSavingError,
      addPersonalSavingResult,
      addPersonalSavingError,
      getSupplierResult,
      getSupplierError,
      addPersonalSavingTakingResult,
      addPersonalSavingTakingError,
      deletePersonalSavingTakingResult,
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
      getPersonalSavingResult &&
      prevProps.getPersonalSavingResult !== getPersonalSavingResult
    ) {
      this.setState({
        pagesCount: Math.ceil(
          getPersonalSavingResult.data.length / this.state.pageSize
        ),
        totalData: getPersonalSavingResult.data.length,
        isDateFilterChanged: false,
      });

      let totalSaving = 0;
      let totalTaken = 0;

      getPersonalSavingResult.data.map((saving) => {
        totalSaving = totalSaving + saving.total;
        totalTaken =
          totalTaken +
          parseInt(saving.total_takings ? saving.total_takings : 0);

        return 0;
      });

      this.setState({
        totalSaving,
        totalTaken,
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
      getPersonalSavingError &&
      prevProps.getPersonalSavingError !== getPersonalSavingError
    ) {
      swal("Error!", getPersonalSavingError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (
      deletePersonalSavingResult &&
      prevProps.deletePersonalSavingResult !== deletePersonalSavingResult
    ) {
      swal("Success!", deletePersonalSavingResult.message, "success");
      this.props.dispatch(refreshToken());
    }
    if (
      deletePersonalSavingError &&
      prevProps.deletePersonalSavingError !== deletePersonalSavingError
    ) {
      swal("Error!", deletePersonalSavingError.message, "error");
    }

    if (
      addPersonalSavingResult &&
      prevProps.addPersonalSavingResult !== addPersonalSavingResult
    ) {
      swal("Success!", addPersonalSavingResult.message, "success");
      this.setState({
        id_supplier: "",
        total: 0,
        note: "",
        personal_saving_date: "",
      });
      this.props.dispatch(refreshToken());
    }

    if (
      addPersonalSavingError &&
      prevProps.addPersonalSavingError !== addPersonalSavingError
    ) {
      swal("Error!", addPersonalSavingError.message, "error");
    }

    if (
      addPersonalSavingTakingResult &&
      prevProps.addPersonalSavingTakingResult !== addPersonalSavingTakingResult
    ) {
      swal("Sucess!", addPersonalSavingTakingResult.message, "success");
      this.setState({
        modalTakingToggle: false,
        addModalToggle: false,
        totalAddTaking: 0,
      });

      this.props.dispatch(refreshToken());
    }

    if (
      addPersonalSavingTakingError &&
      prevProps.addPersonalSavingTakingError !== addPersonalSavingTakingError
    ) {
      swal("Error!", addPersonalSavingTakingError.message, "error");
    }

    if (
      deletePersonalSavingTakingResult &&
      prevProps.deletePersonalSavingTakingResult !==
        deletePersonalSavingTakingResult
    ) {
      this.setState({
        modalTakingToggle: false,
      });
      swal("Success!", deletePersonalSavingTakingResult.message, "success");
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

    this.props.dispatch(getPersonalSavingList(accessToken, filter));
    this.props.dispatch(getPersonalSavingTakingList(accessToken, filter));
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
        this.props.dispatch(deletePersonalSaving(this.state.accessToken, id));
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
    const { id_supplier, total, note, personal_saving_date, accessToken } =
      this.state;
    if (id_supplier && total && note && personal_saving_date) {
      this.props.dispatch(addPersonalSaving(accessToken, this.state));
      this.setState({ modalAddPersonalSavingToggle: false });
    } else {
      swal("Failed!", "Fill all fields!", "error");
    }
  };

  setIsDateFilterChanged = (isDateFilterChanged) => {
    this.setState({ isDateFilterChanged });
  };

  handlePersonalSavingTaking = (id, totalSavingByName, totalTakingByName) => {
    const { getPersonalSavingTakingResult } = this.props;

    const choosenPersonalSaving = getPersonalSavingTakingResult.data.filter(
      (detail) => detail.id === id
    );

    this.setState({
      modalTakingToggle: true,
      choosenPersonalSaving,
      totalSavingByName,
      totalTakingByName,
      totalAddTaking: 0,
    });
  };

  handleAddTaking = (event) => {
    const {
      accessToken,
      totalSavingByName,
      totalAddTaking,
      totalTakingByName,
      choosenPersonalSaving,
    } = this.state;

    event.preventDefault();

    if (
      parseInt(totalTakingByName) + parseInt(totalAddTaking) >
      parseInt(totalSavingByName)
    ) {
      swal("Failed!", "Taken Value is Greater than The Saving!!!", "error");
      return;
    }

    const untaken = totalSavingByName - totalTakingByName;
    this.props.dispatch(
      addPersonalSavingTaking(accessToken, {
        idPersonalSaving: choosenPersonalSaving[0].id,
        total: totalAddTaking,
        untaken,
      })
    );
  };

  handleDeleteTakingData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete data",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch(
          deletePersonalSavingTaking(this.state.accessToken, id)
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
      modalAddPersonalSavingToggle,
      id_supplier,
      total,
      note,
      personal_saving_date,
      isDateFilterChanged,
      totalSaving,
      modalSummaryToggle,
      modalTakingToggle,
      choosenPersonalSaving,
      totalTakingByName,
      totalAddTaking,
      addModalToggle,
      totalTaken,
    } = this.state;
    const { getPersonalSavingLoading, getPersonalSavingResult } = this.props;

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Personal Saving List</CardTitle>
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
                          modalAddPersonalSavingToggle: true,
                        });
                      }}
                    >
                      Add Personal Saving
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
                      <th>Taking</th>
                      <th width="15%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPersonalSavingResult &&
                    getPersonalSavingResult.data.length > 0 ? (
                      getPersonalSavingResult.data
                        .slice(
                          currentPage * pageSize,
                          (currentPage + 1) * pageSize
                        )
                        .map((personalSaving, index) => (
                          <tr key={index}>
                            <td>{currentPage * pageSize + index + 1}</td>
                            <td>
                              <Table borderless>
                                <tbody>
                                  <tr>
                                    <td>Supplier</td>
                                    <td>:</td>
                                    <td>{personalSaving.supplier.name}</td>
                                  </tr>
                                  <tr>
                                    <td>Phone</td>
                                    <td>:</td>
                                    <td>{personalSaving.supplier.phone}</td>
                                  </tr>
                                  <tr>
                                    <td>Image</td>
                                    <td>:</td>
                                    <td>
                                      <img
                                        src={personalSaving.supplier.url}
                                        alt={personalSaving.supplier.url}
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
                                        personalSaving.personal_saving_date
                                      ).format("dddd, DD MMMM YYYY")}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Note</td>
                                    <td>:</td>
                                    <td>
                                      {personalSaving.note &&
                                        personalSaving.note}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>User</td>
                                    <td>:</td>
                                    <td>{personalSaving.user.name}</td>
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
                                      {numberWithCommas(personalSaving.total)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Taken</td>
                                    <td>:</td>
                                    <td>
                                      {numberWithCommas(
                                        personalSaving.total_takings
                                          ? personalSaving.total_takings
                                          : 0
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Untaken</td>
                                    <td>:</td>
                                    <td>
                                      {numberWithCommas(
                                        personalSaving.total ||
                                          personalSaving.total_takings
                                          ? personalSaving.total -
                                              personalSaving.total_takings
                                          : 0
                                      )}
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </td>
                            <td align="center">
                              {(personalSaving.total ||
                              personalSaving.total_takings
                                ? personalSaving.total -
                                  personalSaving.total_takings
                                : 0) !== 0 ? (
                                <>
                                  <Button
                                    className="btn btn-success mr-2 mb-2"
                                    onClick={() =>
                                      this.handlePersonalSavingTaking(
                                        personalSaving.id,
                                        personalSaving.total,
                                        personalSaving.total_takings
                                          ? personalSaving.total_takings
                                          : 0
                                      )
                                    }
                                  >
                                    <i className="nc-icon nc-credit-card"></i>{" "}
                                    Takings
                                  </Button>
                                  <Button
                                    color="danger"
                                    className="mr-2 mb-2"
                                    onClick={() =>
                                      this.deleteData(personalSaving.id)
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
                    ) : getPersonalSavingLoading ? (
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
        <AddPersonalSavingModal
          modalToggle={modalAddPersonalSavingToggle}
          handleClose={() =>
            this.setState({ modalAddPersonalSavingToggle: false })
          }
          handleSubmit={this.handleAddSubmit}
          handleChange={this.handleChange}
          id_supplier={id_supplier}
          total={total}
          note={note}
          personal_saving_date={personal_saving_date}
        />
        <SavingSummaryModal
          modalToggle={modalSummaryToggle}
          handleClose={() => this.setState({ modalSummaryToggle: false })}
          title="Personal Saving Summary"
          totalSaving={totalSaving}
          totalTaken={totalTaken}
        />
        <PersonalSavingTakingListModal
          modalToggle={modalTakingToggle}
          handleClose={() => this.setState({ modalTakingToggle: false })}
          addModalToggle={() => this.setState({ addModalToggle: true })}
          choosenPersonalSaving={choosenPersonalSaving}
          totalTakingByName={totalTakingByName}
          handleDeleteTakingData={this.handleDeleteTakingData}
        />
        <TakeTakingModal
          modalToggle={addModalToggle}
          handleClose={() => this.setState({ addModalToggle: false })}
          totalAddTaking={totalAddTaking}
          handleChange={this.handleChange}
          handleSubmit={this.handleAddTaking}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getPersonalSavingLoading:
    state.PersonalSavingReducer.getPersonalSavingLoading,
  getPersonalSavingResult: state.PersonalSavingReducer.getPersonalSavingResult,
  getPersonalSavingError: state.PersonalSavingReducer.getPersonalSavingError,

  getPersonalSavingTakingLoading:
    state.PersonalSavingTakingReducer.getPersonalSavingTakingLoading,
  getPersonalSavingTakingResult:
    state.PersonalSavingTakingReducer.getPersonalSavingTakingResult,
  getPersonalSavingTakingError:
    state.PersonalSavingTakingReducer.getPersonalSavingTakingError,

  addPersonalSavingTakingLoading:
    state.PersonalSavingTakingReducer.addPersonalSavingTakingLoading,
  addPersonalSavingTakingResult:
    state.PersonalSavingTakingReducer.addPersonalSavingTakingResult,
  addPersonalSavingTakingError:
    state.PersonalSavingTakingReducer.addPersonalSavingTakingError,

  deletePersonalSavingTakingLoading:
    state.PersonalSavingTakingReducer.deletePersonalSavingTakingLoading,
  deletePersonalSavingTakingResult:
    state.PersonalSavingTakingReducer.deletePersonalSavingTakingResult,
  deletePersonalSavingTakingError:
    state.PersonalSavingTakingReducer.deletePersonalSavingTakingError,

  addPersonalSavingLoading:
    state.PersonalSavingReducer.addPersonalSavingLoading,
  addPersonalSavingResult: state.PersonalSavingReducer.addPersonalSavingResult,
  addPersonalSavingError: state.PersonalSavingReducer.addPersonalSavingError,

  deletePersonalSavingLoading:
    state.PersonalSavingReducer.deletePersonalSavingLoading,
  deletePersonalSavingResult:
    state.PersonalSavingReducer.deletePersonalSavingResult,
  deletePersonalSavingError:
    state.PersonalSavingReducer.deletePersonalSavingError,

  getSupplierLoading: state.SupplierReducer.getSupplierLoading,
  getSupplierResult: state.SupplierReducer.getSupplierResult,
  getSupplierError: state.SupplierReducer.getSupplierError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(PersonalSavingList);
