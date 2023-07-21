import { refreshToken } from "actions/AuthAction";
import { addVehicle } from "../../actions/vehicle/VehicleAction";
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
import { getBrandList } from "actions/brand/BrandAction";
import { getTypeList } from "actions/type/TypeAction";

class AddVehicle extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      this.props.dispatch(addVehicle(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Detail Type should be filled", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      addVehicleResult,
      addVehicleError,
      refreshTokenError,
      refreshTokenResult,
      getBrandError,
      getBrandResult,
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
    }

    if (getBrandResult && prevProps.getBrandResult !== getBrandResult) {
      if (getBrandResult.data.length === 0) {
        swal("Error!", "Input Brand First", "error");
        this.props.history.push("/admin/dashboard");
      } else this.setState({ id_brand: getBrandResult.data[0].id });
    }

    if (getBrandError && prevProps.getBrandError !== getBrandError) {
      swal("Error!", getBrandError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (getTypeResult && prevProps.getTypeResult !== getTypeResult) {
      if (getTypeResult.data.length === 0) {
        swal("Error!", "Input Type First", "error");
        this.props.history.push("/admin/dashboard");
      } else this.setState({ id_type: getTypeResult.data[0].id });
    }

    if (getTypeError && prevProps.getTypeError !== getTypeError) {
      swal("Error!", getTypeError.message, "error");
      this.props.history.push("/admin/dashboard");
    }

    if (addVehicleResult && prevProps.addVehicleResult !== addVehicleResult) {
      swal("Success!", addVehicleResult.message, "success");
      this.props.history.push("/admin/vehicles");
    }
    if (addVehicleError && prevProps.addVehicleError !== addVehicleError) {
      swal("Error!", addVehicleError.message, "error");
    }
  }

  render() {
    const { id_brand, id_type, detail_type, note } = this.state;
    const {
      addVehicleLoading,
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
                <CardTitle tag="h4">Add Vehicle</CardTitle>
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
                      {addVehicleLoading ? (
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
  addVehicleLoading: state.VehicleReducer.addVehicleLoading,
  addVehicleResult: state.VehicleReducer.addVehicleResult,
  addVehicleError: state.VehicleReducer.addVehicleError,

  getBrandLoading: state.BrandReducer.getBrandLoading,
  getBrandResult: state.BrandReducer.getBrandResult,
  getBrandError: state.BrandReducer.getBrandError,

  getTypeLoading: state.TypeReducer.getTypeLoading,
  getTypeResult: state.TypeReducer.getTypeResult,
  getTypeError: state.TypeReducer.getTypeError,

  refreshTokenError: state.AuthReducer.refreshTokenError,
  refreshTokenResult: state.AuthReducer.refreshTokenResult,
});

export default connect(mapStateToProps, null)(AddVehicle);
