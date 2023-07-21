import { refreshToken } from "actions/AuthAction";
import { deleteCost } from "actions/cost/CostAction";
import { addCost } from "actions/cost/CostAction";
import { getCostList } from "actions/cost/CostAction";
import { AddCostModal } from "components/Modal/cost/AddCostModal";
import CostSummaryModal from "components/Modal/CostSummaryModal";
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

export class CostList extends Component {
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

      code: "",
      total: 0,
      note: "",
      cost_date: "",

      totalCost: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      getCostError,
      refreshTokenError,
      refreshTokenResult,
      getCostResult,
      deleteCostResult,
      deleteCostError,
      addCostResult,
      addCostError,
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

    if (getCostResult && prevProps.getCostResult !== getCostResult) {
      this.setState({
        pagesCount: Math.ceil(getCostResult.data.length / this.state.pageSize),
        totalData: getCostResult.data.length,
        isDateFilterChanged: false,
      });

      let totalCost = 0;
      getCostResult.data.map((cost) => (totalCost = totalCost + cost.total));

      this.setState({
        totalCost,
      });
    }

    if (getCostError && prevProps.getCostError !== getCostError) {
      swal("Error!", getCostError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (deleteCostResult && prevProps.deleteCostResult !== deleteCostResult) {
      swal("Success!", deleteCostResult.message, "success");
      this.props.dispatch(refreshToken());
    }
    if (deleteCostError && prevProps.deleteCostError !== deleteCostError) {
      swal("Error!", deleteCostError.message, "error");
    }

    if (addCostResult && prevProps.addCostResult !== addCostResult) {
      swal("Success!", addCostResult.message, "success");
      this.setState({
        code: "",
        total: 0,
        note: "",
        cost_date: "",
      });
      this.props.dispatch(refreshToken());
    }

    if (addCostError && prevProps.addCostError !== addCostError) {
      swal("Error!", addCostError.message, "error");
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
      getCostList(accessToken, {
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
        this.props.dispatch(deleteCost(this.state.accessToken, id));
      }
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAddSubmit = (event) => {
    const { code, total, note, cost_date, accessToken } = this.state;
    event.preventDefault();
    if (code && total && note && cost_date) {
      this.props.dispatch(addCost(accessToken, this.state));
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
      code,
      total,
      note,
      cost_date,
      isDateFilterChanged,
      totalCost,
      modalSummaryToggle,
    } = this.state;
    const { getCostLoading, getCostResult } = this.props;

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Cost List</CardTitle>
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
                      Add Cost
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
                      <th>Vehicle</th>
                      <th>Detail</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCostResult && getCostResult.data.length > 0 ? (
                      getCostResult.data
                        .slice(
                          currentPage * pageSize,
                          (currentPage + 1) * pageSize
                        )
                        .map((cost, index) => {
                          return (
                            <tr key={index}>
                              <td>{currentPage * pageSize + index + 1}</td>
                              <td>
                                <Table borderless>
                                  <tbody>
                                    <tr>
                                      <td>Code</td>
                                      <td>:</td>
                                      <td>
                                        {cost.ownership && cost.ownership.code}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Licence Plate</td>
                                      <td>:</td>
                                      <td>
                                        {cost.ownership &&
                                          cost.ownership.licence_plate}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Type</td>
                                      <td>:</td>
                                      <td>
                                        {cost.ownership &&
                                          cost.ownership.vehicle.type.name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Cost</td>
                                      <td>:</td>
                                      <td>
                                        {cost.ownership &&
                                          cost.ownership.vehicle.brand.name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Detail Type</td>
                                      <td>:</td>
                                      <td>
                                        {cost.ownership &&
                                          cost.ownership.vehicle.detail_type}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Supplier</td>
                                      <td>:</td>
                                      <td>
                                        {cost.ownership &&
                                          cost.ownership.supplier.name}
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
                                        {moment(cost.cost_date).format(
                                          "dddd, DD MMMM YYYY"
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Note</td>
                                      <td>:</td>
                                      <td>{cost.note && cost.note}</td>
                                    </tr>
                                    <tr>
                                      <td>Total</td>
                                      <td>:</td>
                                      <td>
                                        Rp. {numberWithCommas(cost.total)}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>User</td>
                                      <td>:</td>
                                      <td>{cost.user.name}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </td>
                              <td align="center">
                                <Button
                                  color="danger"
                                  className="ml-2"
                                  onClick={() => this.deleteData(cost.id)}
                                >
                                  <i className="nc-icon nc-basket"></i> Delete
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                    ) : getCostLoading ? (
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
        <AddCostModal
          modalToggle={modalAddToggle}
          handleClose={() => this.setState({ modalAddToggle: false })}
          handleSubmit={this.handleAddSubmit}
          handleChange={this.handleChange}
          code={code}
          total={total}
          note={note}
          cost_date={cost_date}
        />
        <CostSummaryModal
          modalToggle={modalSummaryToggle}
          handleClose={() => this.setState({ modalSummaryToggle: false })}
          title="Cost Summary"
          totalCost={totalCost}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getCostLoading: state.CostReducer.getCostLoading,
  getCostResult: state.CostReducer.getCostResult,
  getCostError: state.CostReducer.getCostError,

  addCostLoading: state.CostReducer.addCostLoading,
  addCostResult: state.CostReducer.addCostResult,
  addCostError: state.CostReducer.addCostError,

  deleteCostLoading: state.CostReducer.deleteCostLoading,
  deleteCostResult: state.CostReducer.deleteCostResult,
  deleteCostError: state.CostReducer.deleteCostError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(CostList);
