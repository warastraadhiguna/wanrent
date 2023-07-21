import { refreshToken } from "actions/AuthAction";
import {
  getDetailCustomer,
  editCustomer,
} from "actions/customer/CustomerAction";
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

class EditCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      phone: "",
      note: "",
      file: "",
      preview: "",
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
    const { name, phone } = this.state;
    event.preventDefault();
    if (name && phone) {
      this.props.dispatch(editCustomer(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Fill all fields!!", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      editCustomerResult,
      editCustomerError,
      getDetailCustomerResult,
      getDetailCustomerError,
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
      this.props.dispatch(
        getDetailCustomer(
          refreshTokenResult.accessToken,
          this.props.match.params.id
        )
      );
    }
    if (
      getDetailCustomerResult &&
      prevProps.getDetailCustomerResult !== getDetailCustomerResult
    ) {
      this.setState({
        name: getDetailCustomerResult.data.name,
        phone: getDetailCustomerResult.data.phone,
        note: getDetailCustomerResult.data.note,
        file: getDetailCustomerResult.data.url,
        preview: getDetailCustomerResult.data.url,
      });
    }
    if (
      getDetailCustomerError &&
      prevProps.getDetailCustomerError !== getDetailCustomerError
    ) {
      swal("Error!", getDetailCustomerError.message, "error");
    }
    if (
      editCustomerResult &&
      prevProps.editCustomerResult !== editCustomerResult
    ) {
      swal("Success!", editCustomerResult.message, "success");
      this.props.history.push("/admin/customers");
    }
    if (
      editCustomerError &&
      prevProps.editCustomerError !== editCustomerError
    ) {
      swal("Error!", editCustomerError.message, "error");
    }
  }

  loadImage = (e) => {
    const file = e.target.files[0];
    this.setState({ file });
    this.setState({ preview: URL.createObjectURL(file) });
  };

  render() {
    const { name, phone, preview, note } = this.state;
    const { editCustomerLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Edit Customer</CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Nama</label>
                        <Input
                          type="text"
                          value={name}
                          name="name"
                          autoComplete="off"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Phone</label>
                        <Input
                          type="text"
                          value={phone}
                          name="phone"
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
                      {editCustomerLoading ? (
                        <Button color="primary" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <>
                          <Button color="primary">Submit</Button>
                          <Link
                            to="/admin/customers"
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
  getDetailCustomerLoading: state.CustomerReducer.getDetailCustomerLoading,
  getDetailCustomerResult: state.CustomerReducer.getDetailCustomerResult,
  getDetailCustomerError: state.CustomerReducer.getDetailCustomerError,

  editCustomerLoading: state.CustomerReducer.editCustomerLoading,
  editCustomerResult: state.CustomerReducer.editCustomerResult,
  editCustomerError: state.CustomerReducer.editCustomerError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(EditCustomer);
