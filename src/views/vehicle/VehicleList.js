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
  getVehicleList,
  deleteVehicle,
} from "../../actions/vehicle/VehicleAction";

class VehicleList extends Component {
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
      deleteVehicleResult,
      deleteVehicleError,
      getVehicleError,
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
      this.props.dispatch(getVehicleList(refreshTokenResult.accessToken));
    }

    if (getVehicleError && prevProps.getVehicleError !== getVehicleError) {
      swal("Error!", getVehicleError.message, "error");
      this.props.history.push("/admin/dashboard");
    }
    if (
      deleteVehicleResult &&
      prevProps.deleteVehicleResult !== deleteVehicleResult
    ) {
      swal("Success!", deleteVehicleResult.message, "success");
      this.props.dispatch(getVehicleList(this.state.accessToken));
    }
    if (
      deleteVehicleError &&
      prevProps.deleteVehicleError !== deleteVehicleError
    ) {
      swal("Error!", deleteVehicleError.message, "error");
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
        this.props.dispatch(deleteVehicle(this.state.accessToken, id));
      }
    });
  };

  render() {
    const { getVehicleLoading, getVehicleResult } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Vehicle</CardTitle>
                <Link
                  to="/admin/vehicle/add"
                  className="btn btn-primary float-right"
                >
                  Tambah Vehicle
                </Link>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th width="5%">No</th>
                      <th>Brand</th>
                      <th>Type</th>
                      <th>Detail Type</th>
                      <th>Note</th>
                      <th width="20%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getVehicleResult ? (
                      getVehicleResult.data.map((vehicle, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{vehicle.brand.name}</td>
                          <td>{vehicle.type.name}</td>
                          <td>{vehicle.detail_type}</td>
                          <td>{vehicle.note}</td>
                          <td align="center">
                            <Link
                              className="btn btn-warning mr-2 mb-2"
                              to={"/admin/vehicle/edit/" + vehicle.id}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                            <Button
                              color="danger"
                              className=" mr-2 mb-2"
                              onClick={() => this.deleteData(vehicle.id)}
                            >
                              <i className="nc-icon nc-basket"></i> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getVehicleLoading ? (
                      <tr>
                        <td colSpan={6} align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={6} align="center">
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
  getVehicleLoading: state.VehicleReducer.getVehicleLoading,
  getVehicleResult: state.VehicleReducer.getVehicleResult,
  getVehicleError: state.VehicleReducer.getVehicleError,

  deleteVehicleLoading: state.VehicleReducer.deleteVehicleLoading,
  deleteVehicleResult: state.VehicleReducer.deleteVehicleResult,
  deleteVehicleError: state.VehicleReducer.deleteVehicleError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(VehicleList);
