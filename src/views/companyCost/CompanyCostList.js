import { refreshToken } from "actions/AuthAction";
import {
  deleteCompanyCost,
  addCompanyCost,
  getCompanyCostList,
} from "actions/companyCost/CompanyCostAction";
import CostSummaryModal from "components/Modal/CostSummaryModal";
import { AddCompanyCostModal } from "components/Modal/companyCost/AddCompanyCostModal";
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

export class CompanyCostList extends Component {
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

      total: 0,
      note: "",
      company_cost_date: "",
      totalCost: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      getCompanyCostError,
      refreshTokenError,
      refreshTokenResult,
      getCompanyCostResult,
      deleteCompanyCostResult,
      deleteCompanyCostError,
      addCompanyCostResult,
      addCompanyCostError,
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

      let totalCost = 0;
      getCompanyCostResult.data.map(
        (cost) => (totalCost = totalCost + cost.total)
      );

      this.setState({
        totalCost,
      });
    }

    if (
      getCompanyCostError &&
      prevProps.getCompanyCostError !== getCompanyCostError
    ) {
      swal("Error!", getCompanyCostError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (
      deleteCompanyCostResult &&
      prevProps.deleteCompanyCostResult !== deleteCompanyCostResult
    ) {
      swal("Success!", deleteCompanyCostResult.message, "success");
      this.props.dispatch(refreshToken());
    }
    if (
      deleteCompanyCostError &&
      prevProps.deleteCompanyCostError !== deleteCompanyCostError
    ) {
      swal("Error!", deleteCompanyCostError.message, "error");
    }

    if (
      addCompanyCostResult &&
      prevProps.addCompanyCostResult !== addCompanyCostResult
    ) {
      swal("Success!", addCompanyCostResult.message, "success");
      this.setState({
        total: 0,
        note: "",
        company_cost_date: "",
      });
      this.props.dispatch(refreshToken());
    }

    if (
      addCompanyCostError &&
      prevProps.addCompanyCostError !== addCompanyCostError
    ) {
      swal("Error!", addCompanyCostError.message, "error");
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
      getCompanyCostList(accessToken, {
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
        this.props.dispatch(deleteCompanyCost(this.state.accessToken, id));
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
    const { total, note, company_cost_date, accessToken } = this.state;
    if (total && note && company_cost_date) {
      this.props.dispatch(addCompanyCost(accessToken, this.state));
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
      total,
      note,
      company_cost_date,
      isDateFilterChanged,
      totalCost,
      modalSummaryToggle,
    } = this.state;
    const { getCompanyCostLoading, getCompanyCostResult } = this.props;

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Company Cost List</CardTitle>
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
                      Add Company Cost
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
                      <th>Detail</th>
                      <th width="15%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCompanyCostResult &&
                    getCompanyCostResult.data.length > 0 ? (
                      getCompanyCostResult.data
                        .slice(
                          currentPage * pageSize,
                          (currentPage + 1) * pageSize
                        )
                        .map((companyCost, index) => (
                          <tr key={index}>
                            <td>{currentPage * pageSize + index + 1}</td>
                            <td>
                              <Table borderless>
                                <tbody>
                                  <tr>
                                    <td>Date</td>
                                    <td>:</td>
                                    <td>
                                      {" "}
                                      {moment(
                                        companyCost.company_cost_date
                                      ).format("dddd, DD MMMM YYYY")}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Note</td>
                                    <td>:</td>
                                    <td>
                                      {companyCost.note && companyCost.note}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>Total</td>
                                    <td>:</td>
                                    <td>
                                      Rp. {numberWithCommas(companyCost.total)}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>User</td>
                                    <td>:</td>
                                    <td>{companyCost.user.name}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </td>
                            <td align="center">
                              <Button
                                color="danger"
                                className="ml-2"
                                onClick={() => this.deleteData(companyCost.id)}
                              >
                                <i className="nc-icon nc-basket"></i> Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                    ) : getCompanyCostLoading ? (
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
        <AddCompanyCostModal
          modalToggle={modalAddToggle}
          handleClose={() => this.setState({ modalAddToggle: false })}
          handleSubmit={this.handleAddSubmit}
          handleChange={this.handleChange}
          total={total}
          note={note}
          company_cost_date={company_cost_date}
        />
        <CostSummaryModal
          modalToggle={modalSummaryToggle}
          handleClose={() => this.setState({ modalSummaryToggle: false })}
          title="Company Cost Summary"
          totalCost={totalCost}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getCompanyCostLoading: state.CompanyCostReducer.getCompanyCostLoading,
  getCompanyCostResult: state.CompanyCostReducer.getCompanyCostResult,
  getCompanyCostError: state.CompanyCostReducer.getCompanyCostError,

  addCompanyCostLoading: state.CompanyCostReducer.addCompanyCostLoading,
  addCompanyCostResult: state.CompanyCostReducer.addCompanyCostResult,
  addCompanyCostError: state.CompanyCostReducer.addCompanyCostError,

  deleteCompanyCostLoading: state.CompanyCostReducer.deleteCompanyCostLoading,
  deleteCompanyCostResult: state.CompanyCostReducer.deleteCompanyCostResult,
  deleteCompanyCostError: state.CompanyCostReducer.deleteCompanyCostError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(CompanyCostList);
