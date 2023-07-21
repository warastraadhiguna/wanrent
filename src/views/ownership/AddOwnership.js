import { refreshToken } from "actions/AuthAction";
import { addOwnership } from "../../actions/ownership/OwnershipAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import { getSupplierList } from "actions/supplier/SupplierAction";
import { getVehicleList } from "actions/vehicle/VehicleAction";

class AddOwnership extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_supplier: "",
      id_vehicle: "",
      code: "",
      licence_plate: "",
      file: "",
      preview: "",
      note: "",
      accessToken: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { code, licence_plate } = this.state;
    event.preventDefault();
    if ((code, licence_plate)) {
      this.props.dispatch(addOwnership(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Detail Vehicle should be filled", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      addOwnershipResult,
      addOwnershipError,
      refreshTokenError,
      refreshTokenResult,
      getSupplierError,
      getSupplierResult,
      getVehicleResult,
      getVehicleError,
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
      this.props.dispatch(getVehicleList(refreshTokenResult.accessToken));
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

    if (getVehicleResult && prevProps.getVehicleResult !== getVehicleResult) {
      if (getVehicleResult.data.length === 0) {
        swal("Error!", "Input Vehicle First", "error");
        this.props.history.push("/admin/dashboard");
      } else this.setState({ id_vehicle: getVehicleResult.data[0].id });
    }

    if (getVehicleError && prevProps.getVehicleError !== getVehicleError) {
      swal("Error!", getVehicleError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (
      addOwnershipResult &&
      prevProps.addOwnershipResult !== addOwnershipResult
    ) {
      swal("Success!", addOwnershipResult.message, "success");
      this.props.history.push("/admin/ownerships");
    }
    if (
      addOwnershipError &&
      prevProps.addOwnershipError !== addOwnershipError
    ) {
      swal("Error!", addOwnershipError.message, "error");
    }
  }

  loadImage = (e) => {
    const file = e.target.files[0];
    this.setState({ file });
    this.setState({ preview: URL.createObjectURL(file) });
  };

  render() {
    const { id_supplier, id_vehicle, code, licence_plate, note, preview } =
      this.state;
    const {
      addOwnershipLoading,
      getSupplierLoading,
      getSupplierResult,
      getVehicleResult,
      getVehicleLoading,
    } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Add Ownership</CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Supplier</label>
                        {getSupplierLoading ? (
                          <Spinner size="sm" color="light" />
                        ) : (
                          <Input
                            type="select"
                            name="id_supplier"
                            onChange={(event) => this.handleChange(event)}
                            value={id_supplier}
                            options={getSupplierResult.data}
                          >
                            {getSupplierResult &&
                              getSupplierResult.data.map((supplier, index) => (
                                <option key={index} value={supplier.id}>
                                  {supplier.name}
                                </option>
                              ))}
                          </Input>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Vehicle</label>
                        {getVehicleLoading ? (
                          <Spinner size="sm" color="light" />
                        ) : (
                          <Input
                            type="select"
                            name="id_vehicle"
                            onChange={(event) => this.handleChange(event)}
                            value={id_vehicle}
                            options={getVehicleResult.data}
                          >
                            {getVehicleResult &&
                              getVehicleResult.data.map((vehicle, index) => (
                                <option key={index} value={vehicle.id}>
                                  {vehicle.type.name} - {vehicle.detail_type}
                                </option>
                              ))}
                          </Input>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Code</label>
                        <Input
                          type="text"
                          value={code}
                          placeholder="ex : Ang2"
                          name="code"
                          autoComplete="off"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Licence Plate</label>
                        <Input
                          type="text"
                          value={licence_plate}
                          placeholder="ex : H1234AS"
                          name="licence_plate"
                          autoComplete="off"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Note</label>
                        <Input
                          type="textarea"
                          value={note}
                          name="note"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Image</label>
                        <img src={preview} alt="" width={100} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <input
                          type="file"
                          className="file-input"
                          onChange={(event) => this.loadImage(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      {addOwnershipLoading ? (
                        <Button color="primary" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <>
                          <Button color="primary">Submit</Button>
                          <Link
                            to="/admin/ownerships"
                            className="btn btn-warning"
                          >
                            Kembali
                          </Link>
                        </>
                      )}
                    </Col>
                  </Row>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  addOwnershipLoading: state.OwnershipReducer.addOwnershipLoading,
  addOwnershipResult: state.OwnershipReducer.addOwnershipResult,
  addOwnershipError: state.OwnershipReducer.addOwnershipError,

  getSupplierLoading: state.SupplierReducer.getSupplierLoading,
  getSupplierResult: state.SupplierReducer.getSupplierResult,
  getSupplierError: state.SupplierReducer.getSupplierError,

  getVehicleLoading: state.VehicleReducer.getVehicleLoading,
  getVehicleResult: state.VehicleReducer.getVehicleResult,
  getVehicleError: state.VehicleReducer.getVehicleError,

  refreshTokenError: state.AuthReducer.refreshTokenError,
  refreshTokenResult: state.AuthReducer.refreshTokenResult,
});

export default connect(mapStateToProps, null)(AddOwnership);
