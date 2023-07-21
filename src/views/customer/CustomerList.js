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
  getCustomerList,
  deleteCustomer,
} from "../../actions/customer/CustomerAction";
import ImageModal from "components/Modal/ImageModal";
import { PaginationComponent, SearchComponent } from "components/Table";

class CustomerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalImageToggle: false,
      accessToken: "",
      urlImageShow: "",

      searchedText: "",
      keyword: "",
      totalData: 0,
      currentPage: 0,
      pageSize: 10,
      pagesCount: 0,
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const { searchedText } = this.state;
    const {
      deleteCustomerResult,
      deleteCustomerError,
      getCustomerError,
      refreshTokenError,
      refreshTokenResult,
      getCustomerResult,
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
        getCustomerList(refreshTokenResult.accessToken, searchedText)
      );
    }
    if (
      getCustomerResult &&
      prevProps.getCustomerResult !== getCustomerResult
    ) {
      this.setState({
        pagesCount: Math.ceil(
          getCustomerResult.data.length / this.state.pageSize
        ),
        totalData: getCustomerResult.data.length,
      });
    }

    if (getCustomerError && prevProps.getCustomerError !== getCustomerError) {
      swal("Error!", getCustomerError.message, "error");
      this.props.history.push("/admin/dashboard");
    }
    if (
      deleteCustomerResult &&
      prevProps.deleteCustomerResult !== deleteCustomerResult
    ) {
      swal("Success!", deleteCustomerResult.message, "success");
      this.props.dispatch(getCustomerList(this.state.accessToken));
    }
    if (
      deleteCustomerError &&
      prevProps.deleteCustomerError !== deleteCustomerError
    ) {
      swal("Error!", deleteCustomerError.message, "error");
    }
  }

  deleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete data success",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch(deleteCustomer(this.state.accessToken, id));
      }
    });
  };

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

  keywordHandleSubmit = (event) => {
    const { keyword, accessToken } = this.state;
    event.preventDefault();
    this.setState({ searchedText: keyword });
    this.props.dispatch(getCustomerList(accessToken, keyword));
  };

  render() {
    const {
      modalImageToggle,
      urlImageShow,
      currentPage,
      pagesCount,
      totalData,
      pageSize,
      keyword,
      searchedText,
    } = this.state;
    const { getCustomerLoading, getCustomerResult } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Customer</CardTitle>
                <Link
                  to="/admin/customer/add"
                  className="btn btn-primary float-right"
                >
                  Tambah Customer
                </Link>
              </CardHeader>
              <CardBody>
                <SearchComponent
                  keyword={keyword}
                  searchedText={searchedText}
                  keywordHandleSubmit={this.keywordHandleSubmit}
                  handleChange={this.handleChange}
                />
                <Table bordered striped responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Image</th>
                      <th width="20%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCustomerResult ? (
                      getCustomerResult.data
                        .slice(
                          currentPage * pageSize,
                          (currentPage + 1) * pageSize
                        )
                        .map((customer, index) => (
                          <tr key={index}>
                            <td>{currentPage * pageSize + index + 1}</td>
                            <td>{customer.name}</td>
                            <td>{customer.phone}</td>
                            <td>
                              <img
                                src={customer.url}
                                alt={customer.image}
                                width={100}
                                onClick={() => {
                                  this.setState({
                                    modalImageToggle: true,
                                    urlImageShow: customer.url,
                                  });
                                }}
                              />
                            </td>
                            <td align="center">
                              <Link
                                className="btn btn-warning mr-2 mb-2"
                                to={"/admin/customer/edit/" + customer.id}
                              >
                                <i className="nc-icon nc-ruler-pencil"></i> Edit
                              </Link>
                              <Button
                                color="danger"
                                className="mr-2 mb-2"
                                onClick={() => this.deleteData(customer.id)}
                              >
                                <i className="nc-icon nc-basket"></i> Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                    ) : getCustomerLoading ? (
                      <tr>
                        <td colSpan={5} align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={5} align="center">
                          Data Kosong
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
        <ImageModal
          modalToggle={modalImageToggle}
          urlImageShow={urlImageShow}
          handleClose={() => this.setState({ modalImageToggle: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getCustomerLoading: state.CustomerReducer.getCustomerLoading,
  getCustomerResult: state.CustomerReducer.getCustomerResult,
  getCustomerError: state.CustomerReducer.getCustomerError,

  deleteCustomerLoading: state.CustomerReducer.deleteCustomerLoading,
  deleteCustomerResult: state.CustomerReducer.deleteCustomerResult,
  deleteCustomerError: state.CustomerReducer.deleteCustomerError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(CustomerList);
