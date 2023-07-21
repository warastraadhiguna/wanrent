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
import { getBrandList, deleteBrand } from "../../actions/brand/BrandAction";

class BrandList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      deleteBrandResult,
      deleteBrandError,
      getBrandError,
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
      this.props.dispatch(getBrandList(refreshTokenResult.accessToken));
    }

    if (getBrandError && prevProps.getBrandError !== getBrandError) {
      swal("Error!", getBrandError.message, "error");
      this.props.history.push("/admin/dashboard");
    }
    if (
      deleteBrandResult &&
      prevProps.deleteBrandResult !== deleteBrandResult
    ) {
      swal("Success!", deleteBrandResult.message, "success");
      this.props.dispatch(getBrandList(this.state.accessToken));
    }
    if (deleteBrandError && prevProps.deleteBrandError !== deleteBrandError) {
      swal("Error!", deleteBrandError.message, "error");
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
        this.props.dispatch(deleteBrand(this.state.accessToken, id));
      }
    });
  };

  render() {
    const { getBrandLoading, getBrandResult } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Brand</CardTitle>
                <Link
                  to="/admin/brand/add"
                  className="btn btn-primary float-right"
                >
                  Tambah Brand
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th width="5%">No</th>
                      <th>Name</th>
                      <th width="20%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getBrandResult ? (
                      getBrandResult.data.map((brand, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{brand.name}</td>
                          <td align="center">
                            <Link
                              className="btn btn-warning"
                              to={"/admin/brand/edit/" + brand.id}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() => this.deleteData(brand.id)}
                            >
                              <i className="nc-icon nc-basket"></i> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getBrandLoading ? (
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getBrandLoading: state.BrandReducer.getBrandLoading,
  getBrandResult: state.BrandReducer.getBrandResult,
  getBrandError: state.BrandReducer.getBrandError,

  deleteBrandLoading: state.BrandReducer.deleteBrandLoading,
  deleteBrandResult: state.BrandReducer.deleteBrandResult,
  deleteBrandError: state.BrandReducer.deleteBrandError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(BrandList);
