import { refreshToken } from "actions/AuthAction";
import { deletePersonalCost } from "actions/personalCost/PersonalCostAction";
import { addPersonalCost } from "actions/personalCost/PersonalCostAction";
import { getPersonalCostList } from "actions/personalCost/PersonalCostAction";
import { getSupplierList } from "actions/supplier/SupplierAction";
import CostSummaryModal from "components/Modal/CostSummaryModal";
import { AddPersonalCostModal } from "components/Modal/personalCost/AddPersonalCostModal";
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

export class PersonalCostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: "",
      modalAddToggle: false,
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

      id_supplier: "",
      total: 0,
      note: "",
      personal_cost_date: "",
      totalCost: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      getPersonalCostError,
      refreshTokenError,
      refreshTokenResult,
      getPersonalCostResult,
      deletePersonalCostResult,
      deletePersonalCostError,
      addPersonalCostResult,
      addPersonalCostError,
      getSupplierResult,
      getSupplierError,
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
      getPersonalCostResult &&
      prevProps.getPersonalCostResult !== getPersonalCostResult
    ) {
      this.setState({
        pagesCount: Math.ceil(
          getPersonalCostResult.data.length / this.state.pageSize
        ),
        totalData: getPersonalCostResult.data.length,
        isDateFilterChanged: false,
      });

      let totalCost = 0;
      getPersonalCostResult.data.map(
        (cost) => (totalCost = totalCost + cost.total)
      );

      this.setState({
        totalCost,
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
      getPersonalCostError &&
      prevProps.getPersonalCostError !== getPersonalCostError
    ) {
      swal("Error!", getPersonalCostError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (
      deletePersonalCostResult &&
      prevProps.deletePersonalCostResult !== deletePersonalCostResult
    ) {
      swal("Success!", deletePersonalCostResult.message, "success");
      this.props.dispatch(refreshToken());
    }
    if (
      deletePersonalCostError &&
      prevProps.deletePersonalCostError !== deletePersonalCostError
    ) {
      swal("Error!", deletePersonalCostError.message, "error");
    }

    if (
      addPersonalCostResult &&
      prevProps.addPersonalCostResult !== addPersonalCostResult
    ) {
      swal("Success!", addPersonalCostResult.message, "success");
      this.setState({
        id_supplier: "",
        total: 0,
        note: "",
        personal_cost_date: "",
      });
      this.props.dispatch(refreshToken());
    }

    if (
      addPersonalCostError &&
      prevProps.addPersonalCostError !== addPersonalCostError
    ) {
      swal("Error!", addPersonalCostError.message, "error");
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
      getPersonalCostList(accessToken, {
        searchedText: keyword,
        startDate: startDateInput,
        endDate: endDateInput,
      })
    );
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
        this.props.dispatch(deletePersonalCost(this.state.accessToken, id));
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
    const { id_supplier, total, note, personal_cost_date, accessToken } =
      this.state;
    if (id_supplier && total && note && personal_cost_date) {
      this.props.dispatch(addPersonalCost(accessToken, this.state));
      this.setState({ modalAddToggle: false });
    } else {
      swal("Failed!", "Fill all fields!", "error");
    }
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
      modalAddToggle,
      id_supplier,
      total,
      note,
      personal_cost_date,
      isDateFilterChanged,
      totalCost,
      modalSummaryToggle,
    } = this.state;
    const { getPersonalCostLoading, getPersonalCostResult } = this.props;

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Personal Cost List</CardTitle>
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
                      className="btn btn-success float-right"
                      onClick={() => {
                        this.setState({
                          modalAddToggle: true,
                        });
                      }}
                    >
                      Add Personal Cost
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPersonalCostResult &&
                    getPersonalCostResult.data.length > 0 ? (
                      getPersonalCostResult.data
                        .slice(
                          currentPage * pageSize,
                          (currentPage + 1) * pageSize
                        )
                        .map((personalCost, index) => (
                          <tr key={index}>
                            <td>{currentPage * pageSize + index + 1}</td>
                            <td>
                              <Table borderless>
                                <tbody>
                                  <tr>
                                    <td>Supplier</td>
                                    <td>:</td>
                                    <td>{personalCost.supplier.name}</td>
                                  </tr>
                                  <tr>
                                    <td>Phone</td>
                                    <td>:</td>
                                    <td>{personalCost.supplier.phone}</td>
                                  </tr>
                                  <tr>
                                    <td>Image</td>
                                    <td>:</td>
                                    <td>
                                      <img
                                        src={personalCost.supplier.url}
                                        alt={personalCost.supplier.url}
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
                                      {" "}
                                      {moment(
                                        personalCost.personal_cost_date
                                      ).format("dddd, DD MMMM YYYY")}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Note</td>
                                    <td>:</td>
                                    <td>
                                      {personalCost.note && personalCost.note}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Total</td>
                                    <td>:</td>
                                    <td>
                                      Rp. {numberWithCommas(personalCost.total)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>User</td>
                                    <td>:</td>
                                    <td>{personalCost.user.name}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </td>
                            <td align="center">
                              <Button
                                color="danger"
                                className="ml-2"
                                onClick={() => this.deleteData(personalCost.id)}
                              >
                                <i className="nc-icon nc-basket"></i> Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                    ) : getPersonalCostLoading ? (
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
        <AddPersonalCostModal
          modalToggle={modalAddToggle}
          handleClose={() => this.setState({ modalAddToggle: false })}
          handleSubmit={this.handleAddSubmit}
          handleChange={this.handleChange}
          id_supplier={id_supplier}
          total={total}
          note={note}
          personal_cost_date={personal_cost_date}
        />
        <CostSummaryModal
          modalToggle={modalSummaryToggle}
          handleClose={() => this.setState({ modalSummaryToggle: false })}
          title="Personal Cost Summary"
          totalCost={totalCost}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getPersonalCostLoading: state.PersonalCostReducer.getPersonalCostLoading,
  getPersonalCostResult: state.PersonalCostReducer.getPersonalCostResult,
  getPersonalCostError: state.PersonalCostReducer.getPersonalCostError,

  addPersonalCostLoading: state.PersonalCostReducer.addPersonalCostLoading,
  addPersonalCostResult: state.PersonalCostReducer.addPersonalCostResult,
  addPersonalCostError: state.PersonalCostReducer.addPersonalCostError,

  deletePersonalCostLoading:
    state.PersonalCostReducer.deletePersonalCostLoading,
  deletePersonalCostResult: state.PersonalCostReducer.deletePersonalCostResult,
  deletePersonalCostError: state.PersonalCostReducer.deletePersonalCostError,

  getSupplierLoading: state.SupplierReducer.getSupplierLoading,
  getSupplierResult: state.SupplierReducer.getSupplierResult,
  getSupplierError: state.SupplierReducer.getSupplierError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(PersonalCostList);
