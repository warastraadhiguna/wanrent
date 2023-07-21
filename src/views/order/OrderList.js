import { refreshToken } from "actions/AuthAction";
import { getCustomerList } from "actions/customer/CustomerAction";
import { deleteOrder } from "actions/order/OrderAction";
import { addOrder } from "actions/order/OrderAction";
import { getOrderList } from "actions/order/OrderAction";
import ImageModal from "components/Modal/ImageModal";
import { AddOrderModal } from "components/Modal/order/AddOrderModal";
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

export class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: "",
      modalAddToggle: false,

      searchedText: "",
      keyword: "",
      totalData: 0,
      currentPage: 0,
      pageSize: 10,
      pagesCount: 0,
      startDate: "",
      endDate: "",
      isDateFilterChanged: false,

      customer: { id: "", name: "" },
      note: "",
      order_date: "",
      modalImageToggle: false,
      urlImageShow: "",

      totalOrder: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      getOrderError,
      refreshTokenError,
      refreshTokenResult,
      getOrderResult,
      deleteOrderResult,
      deleteOrderError,
      addOrderResult,
      addOrderError,
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
      this.props.dispatch(getCustomerList(refreshTokenResult.accessToken));
    }

    if (getOrderResult && prevProps.getOrderResult !== getOrderResult) {
      this.setState({
        pagesCount: Math.ceil(getOrderResult.data.length / this.state.pageSize),
        totalData: getOrderResult.data.length,
        isDateFilterChanged: false,
      });

      let totalOrder = 0;
      getOrderResult.data.map(
        (order) => (totalOrder = totalOrder + order.total)
      );

      this.setState({
        totalOrder,
      });
    }

    if (getOrderError && prevProps.getOrderError !== getOrderError) {
      swal("Error!", getOrderError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (
      deleteOrderResult &&
      prevProps.deleteOrderResult !== deleteOrderResult
    ) {
      swal("Success!", deleteOrderResult.message, "success");
      this.props.dispatch(refreshToken());
    }
    if (deleteOrderError && prevProps.deleteOrderError !== deleteOrderError) {
      swal("Error!", deleteOrderError.message, "error");
    }

    if (addOrderResult && prevProps.addOrderResult !== addOrderResult) {
      swal("Success!", addOrderResult.message, "success");
      this.setState({
        customer: { id: "", name: "" },
        note: "",
        order_date: "",
      });
      this.props.dispatch(refreshToken());
    }

    if (addOrderError && prevProps.addOrderError !== addOrderError) {
      swal("Error!", addOrderError.message, "error");
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
      getOrderList(accessToken, {
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
        this.props.dispatch(deleteOrder(this.state.accessToken, id));
      }
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleAddSubmit = (event) => {
    const { customer, order_date, accessToken } = this.state;
    event.preventDefault();
    if (customer && order_date) {
      this.props.dispatch(addOrder(accessToken, this.state));
      this.setState({ modalAddToggle: false });
    } else {
      swal("Failed!", "Fill all fields!", "error");
    }
  };

  setIsDateFilterChanged = (isDateFilterChanged) => {
    this.setState({ isDateFilterChanged });
  };

  chooseCustomer = (id, name) => {
    this.setState({ customer: { id, name } });
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
      note,
      order_date,
      isDateFilterChanged,
      accessToken,
      customer,
    } = this.state;
    const { getOrderLoading, getOrderResult } = this.props;

    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Order List</CardTitle>
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
                      Add Order
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th width="5%">No</th>
                      <th>Customer</th>
                      <th>Detail</th>
                      <th width="15%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getOrderResult && getOrderResult.data.length > 0 ? (
                      getOrderResult.data
                        .slice(
                          currentPage * pageSize,
                          (currentPage + 1) * pageSize
                        )
                        .map((order, index) => {
                          return (
                            <tr key={index}>
                              <td>{currentPage * pageSize + index + 1}</td>
                              <td>
                                <Table borderless>
                                  <tbody>
                                    <tr>
                                      <td>Customer</td>
                                      <td>:</td>
                                      <td>
                                        {order.customer && order.customer.name}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Phone</td>
                                      <td>:</td>
                                      <td>
                                        {order.customer && order.customer.phone}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Image</td>
                                      <td>:</td>
                                      <td>
                                        {order.customer && (
                                          <img
                                            src={order.customer.url}
                                            alt={order.customer.image}
                                            width={100}
                                            onClick={() => {
                                              this.setState({
                                                modalImageToggle: true,
                                                urlImageShow:
                                                  order.customer.url,
                                              });
                                            }}
                                          />
                                        )}
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
                                        {moment(order.order_date).format(
                                          "dddd, DD MMMM YYYY"
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>Note</td>
                                      <td>:</td>
                                      <td>{order.note && order.note}</td>
                                    </tr>
                                    <tr>
                                      <td>User</td>
                                      <td>:</td>
                                      <td>{order.user.name}</td>
                                    </tr>
                                  </tbody>
                                </Table>
                              </td>
                              <td align="center">
                                <Button
                                  color="danger"
                                  className="ml-2"
                                  onClick={() => this.deleteData(order.id)}
                                >
                                  <i className="nc-icon nc-basket"></i> Delete
                                </Button>
                              </td>
                            </tr>
                          );
                        })
                    ) : getOrderLoading ? (
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
        <AddOrderModal
          modalToggle={modalAddToggle}
          handleClose={() => this.setState({ modalAddToggle: false })}
          handleSubmit={this.handleAddSubmit}
          handleChange={this.handleChange}
          customer={customer}
          note={note}
          order_date={order_date}
          accessToken={accessToken}
          chooseCustomer={this.chooseCustomer}
        />
        <ImageModal
          modalToggle={this.state.modalImageToggle}
          urlImageShow={this.state.urlImageShow}
          handleClose={() => this.setState({ modalImageToggle: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getOrderLoading: state.OrderReducer.getOrderLoading,
  getOrderResult: state.OrderReducer.getOrderResult,
  getOrderError: state.OrderReducer.getOrderError,

  addOrderLoading: state.OrderReducer.addOrderLoading,
  addOrderResult: state.OrderReducer.addOrderResult,
  addOrderError: state.OrderReducer.addOrderError,

  deleteOrderLoading: state.OrderReducer.deleteOrderLoading,
  deleteOrderResult: state.OrderReducer.deleteOrderResult,
  deleteOrderError: state.OrderReducer.deleteOrderError,

  getCustomerLoading: state.CustomerReducer.getCustomerLoading,
  getCustomerResult: state.CustomerReducer.getCustomerResult,
  getCustomerError: state.CustomerReducer.getCustomerError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(OrderList);
