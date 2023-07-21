import { refreshToken } from "actions/AuthAction";
import { getTypeList } from "actions/type/TypeAction";
import { getDetailPrice, editPrice } from "actions/price/PriceAction";
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

class EditPrice extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      id_type: "",
      time: 0,
      price: 0,
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
      this.props.dispatch(editPrice(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Fill all fields!!", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      editPriceResult,
      editPriceError,
      getDetailPriceResult,
      getDetailPriceError,
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
      this.props.dispatch(
        getDetailPrice(
          refreshTokenResult.accessToken,
          this.props.match.params.id
        )
      );
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
      getDetailPriceResult &&
      prevProps.getDetailPriceResult !== getDetailPriceResult
    ) {
      this.setState({
        id_type: getDetailPriceResult.data.id_type,
        time: getDetailPriceResult.data.time / 60,
        price: getDetailPriceResult.data.price,
      });
    }
    if (
      getDetailPriceError &&
      prevProps.getDetailPriceError !== getDetailPriceError
    ) {
      swal("Error!", getDetailPriceError.message, "error");
    }
    if (editPriceResult && prevProps.editPriceResult !== editPriceResult) {
      swal("Success!", editPriceResult.message, "success");
      this.props.history.push("/admin/prices");
    }
    if (editPriceError && prevProps.editPriceError !== editPriceError) {
      swal("Error!", editPriceError.message, "error");
    }
  }

  render() {
    const { id_type, time, price } = this.state;
    const { editPriceLoading, getTypeResult, getTypeLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Edit Price</CardTitle>
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
                      {editPriceLoading ? (
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
  getDetailPriceLoading: state.PriceReducer.getDetailPriceLoading,
  getDetailPriceResult: state.PriceReducer.getDetailPriceResult,
  getDetailPriceError: state.PriceReducer.getDetailPriceError,

  editPriceLoading: state.PriceReducer.editPriceLoading,
  editPriceResult: state.PriceReducer.editPriceResult,
  editPriceError: state.PriceReducer.editPriceError,

  getTypeLoading: state.TypeReducer.getTypeLoading,
  getTypeResult: state.TypeReducer.getTypeResult,
  getTypeError: state.TypeReducer.getTypeError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(EditPrice);
