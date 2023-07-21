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
  getSupplierList,
  deleteSupplier,
} from "../../actions/supplier/SupplierAction";
import ImageModal from "components/Modal/ImageModal";

class SupplierList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalImageToggle: false,
      accessToken: "",
      urlImageShow: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      deleteSupplierResult,
      deleteSupplierError,
      getSupplierError,
      refreshTokenError,
      refreshTokenResult,
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
      this.props.dispatch(getSupplierList(refreshTokenResult.accessToken));
    }

    if (getSupplierError && prevProps.getSupplierError !== getSupplierError) {
      swal("Error!", getSupplierError.message, "error");
      this.props.history.push("/admin/dashboard");
    }
    if (
      deleteSupplierResult &&
      prevProps.deleteSupplierResult !== deleteSupplierResult
    ) {
      swal("Success!", deleteSupplierResult.message, "success");
      this.props.dispatch(getSupplierList(this.state.accessToken));
    }
    if (
      deleteSupplierError &&
      prevProps.deleteSupplierError !== deleteSupplierError
    ) {
      swal("Error!", deleteSupplierError.message, "error");
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
        this.props.dispatch(deleteSupplier(this.state.accessToken, id));
      }
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { modalImageToggle, urlImageShow } = this.state;
    const { getSupplierLoading, getSupplierResult } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Supplier</CardTitle>
                <Link
                  to="/admin/supplier/add"
                  className="btn btn-primary float-right"
                >
                  Tambah Supplier
                </Link>
              </CardHeader>
              <CardBody>
                <Table responsive>
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
                    {getSupplierResult ? (
                      getSupplierResult.data.map((supplier, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{supplier.name}</td>
                          <td>{supplier.phone}</td>
                          <td>
                            <img
                              src={supplier.url}
                              alt={supplier.image}
                              width={100}
                              onClick={() => {
                                this.setState({
                                  modalImageToggle: true,
                                  urlImageShow: supplier.url,
                                });
                              }}
                            />
                          </td>
                          <td align="center">
                            <Link
                              className="btn btn-warning mr-2 mb-2"
                              to={"/admin/supplier/edit/" + supplier.id}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                            <Button
                              color="danger"
                              className="mr-2 mb-2"
                              onClick={() => this.deleteData(supplier.id)}
                            >
                              <i className="nc-icon nc-basket"></i> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getSupplierLoading ? (
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
  getSupplierLoading: state.SupplierReducer.getSupplierLoading,
  getSupplierResult: state.SupplierReducer.getSupplierResult,
  getSupplierError: state.SupplierReducer.getSupplierError,

  deleteSupplierLoading: state.SupplierReducer.deleteSupplierLoading,
  deleteSupplierResult: state.SupplierReducer.deleteSupplierResult,
  deleteSupplierError: state.SupplierReducer.deleteSupplierError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(SupplierList);
