import { refreshToken } from "actions/AuthAction";
import { getBrandList } from "actions/brand/BrandAction";
import { getTypeList } from "actions/type/TypeAction";
import { getDetailVehicle, editVehicle } from "actions/vehicle/VehicleAction";
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

class EditVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      id_brand: "",
      id_type: "",
      detail_type: "",
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
    const { detail_type } = this.state;
    event.preventDefault();
    if (detail_type) {
      this.props.dispatch(editVehicle(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Fill all fields!!", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      editVehicleResult,
      editVehicleError,
      getDetailVehicleResult,
      getDetailVehicleError,
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
      this.props.dispatch(getBrandList(refreshTokenResult.accessToken));
      this.props.dispatch(getTypeList(refreshTokenResult.accessToken));
      this.props.dispatch(
        getDetailVehicle(
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
      getDetailVehicleResult &&
      prevProps.getDetailVehicleResult !== getDetailVehicleResult
    ) {
      this.setState({
        id_brand: getDetailVehicleResult.data.id_brand,
        id_type: getDetailVehicleResult.data.id_type,
        detail_type: getDetailVehicleResult.data.detail_type,
        note: getDetailVehicleResult.data.note,
      });
    }
    if (
      getDetailVehicleError &&
      prevProps.getDetailVehicleError !== getDetailVehicleError
    ) {
      swal("Error!", getDetailVehicleError.message, "error");
    }
    if (
      editVehicleResult &&
      prevProps.editVehicleResult !== editVehicleResult
    ) {
      swal("Success!", editVehicleResult.message, "success");
      this.props.history.push("/admin/vehicles");
    }
    if (editVehicleError && prevProps.editVehicleError !== editVehicleError) {
      swal("Error!", editVehicleError.message, "error");
    }
  }

  render() {
    const { id_brand, id_type, detail_type, note } = this.state;
    const {
      editVehicleLoading,
      getBrandLoading,
      getBrandResult,
      getTypeResult,
      getTypeLoading,
    } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Edit Vehicle</CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Brand</label>
                        {getBrandLoading ? (
                          <Spinner size="sm" color="light" />
                        ) : (
                          <Input
                            type="select"
                            name="id_brand"
                            onChange={(event) => this.handleChange(event)}
                            value={id_brand}
                            options={getBrandResult.data}
                          >
                            {getBrandResult &&
                              getBrandResult.data.map((brand, index) => (
                                <option key={index} value={brand.id}>
                                  {brand.name}
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
                        <label>Type</label>
                        {getTypeLoading ? (
                          <Spinner size="sm" color="light" />
                        ) : (
                          <Input
                            type="select"
                            name="id_type"
                            onChange={(event) => this.handleChange(event)}
                            value={id_type}
                            options={getTypeResult.data}
                          >
                            {getTypeResult &&
                              getTypeResult.data.map((type, index) => (
                                <option key={index} value={type.id}>
                                  {type.name}
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
                        <label>Detail Type</label>
                        <Input
                          type="text"
                          value={detail_type}
                          placeholder="ex : Mio M3"
                          name="detail_type"
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
                    <Col>
                      {editVehicleLoading ? (
                        <Button color="primary" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <>
                          <Button color="primary">Submit</Button>
                          <Link
                            to="/admin/vehicles"
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
  getDetailVehicleLoading: state.VehicleReducer.getDetailVehicleLoading,
  getDetailVehicleResult: state.VehicleReducer.getDetailVehicleResult,
  getDetailVehicleError: state.VehicleReducer.getDetailVehicleError,

  editVehicleLoading: state.VehicleReducer.editVehicleLoading,
  editVehicleResult: state.VehicleReducer.editVehicleResult,
  editVehicleError: state.VehicleReducer.editVehicleError,

  getBrandLoading: state.BrandReducer.getBrandLoading,
  getBrandResult: state.BrandReducer.getBrandResult,
  getBrandError: state.BrandReducer.getBrandError,

  getTypeLoading: state.TypeReducer.getTypeLoading,
  getTypeResult: state.TypeReducer.getTypeResult,
  getTypeError: state.TypeReducer.getTypeError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(EditVehicle);
