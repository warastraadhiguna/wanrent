import { refreshToken } from "actions/AuthAction";
import { addPrice } from "../../actions/price/PriceAction";
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
import { getTypeList } from "actions/type/TypeAction";

class AddPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_type: "",
      time: "0",
      price: "0",
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
    const { time, price } = this.state;
    event.preventDefault();
    if (time && price) {
      this.props.dispatch(addPrice(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Detail Type should be filled", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      addPriceResult,
      addPriceError,
      refreshTokenError,
      refreshTokenResult,
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
      this.props.dispatch(getTypeList(refreshTokenResult.accessToken));
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

    if (addPriceResult && prevProps.addPriceResult !== addPriceResult) {
      swal("Success!", addPriceResult.message, "success");
      this.props.history.push("/admin/prices");
    }
    if (addPriceError && prevProps.addPriceError !== addPriceError) {
      swal("Error!", addPriceError.message, "error");
    }
  }

  render() {
    const { id_type, time, price } = this.state;
    const { addPriceLoading, getTypeResult, getTypeLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Add Price</CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
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
                        <label>Time (Hour)</label>
                        <Input
                          type="number"
                          value={time}
                          name="time"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Price (Rupiah)</label>
                        <Input
                          type="number"
                          value={price}
                          name="price"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      {addPriceLoading ? (
                        <Button color="primary" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <>
                          <Button color="primary">Submit</Button>
                          <Link to="/admin/prices" className="btn btn-warning">
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
  addPriceLoading: state.PriceReducer.addPriceLoading,
  addPriceResult: state.PriceReducer.addPriceResult,
  addPriceError: state.PriceReducer.addPriceError,

  getTypeLoading: state.TypeReducer.getTypeLoading,
  getTypeResult: state.TypeReducer.getTypeResult,
  getTypeError: state.TypeReducer.getTypeError,

  refreshTokenError: state.AuthReducer.refreshTokenError,
  refreshTokenResult: state.AuthReducer.refreshTokenResult,
});

export default connect(mapStateToProps, null)(AddPrice);
