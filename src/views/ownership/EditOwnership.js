import { refreshToken } from "actions/AuthAction";
import {
  getDetailOwnership,
  editOwnership,
} from "actions/ownership/OwnershipAction";
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

class EditOwnership extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
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
    if (code && licence_plate) {
      this.props.dispatch(editOwnership(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Fill all fields!!", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      editOwnershipResult,
      editOwnershipError,
      getDetailOwnershipResult,
      getDetailOwnershipError,
      refreshTokenError,
      refreshTokenResult,
      getBrandResult,
      getBrandError,
      getTypeResult,
      getTypeError,
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
      this.props.dispatch(
        getDetailOwnership(
          refreshTokenResult.accessToken,
          this.props.match.params.id
        )
      );
    }

    if (getBrandResult && prevProps.getBrandResult !== getBrandResult) {
      if (getBrandResult.data.length === 0) {
        swal("Error!", "Input Brand First", "error");
        this.props.history.push("/admin/dashboard");
      }
    }

    if (getBrandError && prevProps.getBrandError !== getBrandError) {
      swal("Error!", getBrandError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (getTypeResult && prevProps.getTypeResult !== getTypeResult) {
      if (getTypeResult.data.length === 0) {
        swal("Error!", "Input Type First", "error");
        this.props.history.push("/admin/dashboard");
      }
    }

    if (getTypeError && prevProps.getTypeError !== getTypeError) {
      swal("Error!", getTypeError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (
      getDetailOwnershipResult &&
      prevProps.getDetailOwnershipResult !== getDetailOwnershipResult
    ) {
      this.setState({
        id_supplier: getDetailOwnershipResult.data.id_supplier,
        id_vehicle: getDetailOwnershipResult.data.id_vehicle,
        code: getDetailOwnershipResult.data.code,
        licence_plate: getDetailOwnershipResult.data.licence_plate,
        note: getDetailOwnershipResult.data.note,
        file: getDetailOwnershipResult.data.url,
        preview: getDetailOwnershipResult.data.url,
      });
    }
    if (
      getDetailOwnershipError &&
      prevProps.getDetailOwnershipError !== getDetailOwnershipError
    ) {
      swal("Error!", getDetailOwnershipError.message, "error");
    }
    if (
      editOwnershipResult &&
      prevProps.editOwnershipResult !== editOwnershipResult
    ) {
      swal("Success!", editOwnershipResult.message, "success");
      this.props.history.push("/admin/ownerships");
    }
    if (
      editOwnershipError &&
      prevProps.editOwnershipError !== editOwnershipError
    ) {
      swal("Error!", editOwnershipError.message, "error");
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
                <CardTitle tag="h4">Edit Ownership</CardTitle>
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
  getDetailOwnershipLoading: state.OwnershipReducer.getDetailOwnershipLoading,
  getDetailOwnershipResult: state.OwnershipReducer.getDetailOwnershipResult,
  getDetailOwnershipError: state.OwnershipReducer.getDetailOwnershipError,

  editOwnershipLoading: state.OwnershipReducer.editOwnershipLoading,
  editOwnershipResult: state.OwnershipReducer.editOwnershipResult,
  editOwnershipError: state.OwnershipReducer.editOwnershipError,

  getSupplierLoading: state.SupplierReducer.getSupplierLoading,
  getSupplierResult: state.SupplierReducer.getSupplierResult,
  getSupplierError: state.SupplierReducer.getSupplierError,

  getVehicleLoading: state.VehicleReducer.getVehicleLoading,
  getVehicleResult: state.VehicleReducer.getVehicleResult,
  getVehicleError: state.VehicleReducer.getVehicleError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(EditOwnership);
