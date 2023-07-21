import { refreshToken } from "actions/AuthAction";
import { addSupplier } from "../../actions/supplier/SupplierAction";
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

class AddSupplier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      phone: "",
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
      this.props.dispatch(addSupplier(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Semua field harus diisi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      addSupplierResult,
      addSupplierError,
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
    }

    if (
      addSupplierResult &&
      prevProps.addSupplierResult !== addSupplierResult
    ) {
      swal("Success!", addSupplierResult.message, "success");
      this.props.history.push("/admin/suppliers");
    }
    if (addSupplierError && prevProps.addSupplierError !== addSupplierError) {
      swal("Error!", addSupplierError.message, "error");
    }
  }

  loadImage = (e) => {
    const file = e.target.files[0];
    this.setState({ file });
    this.setState({ preview: URL.createObjectURL(file) });
  };

  render() {
    const { name, phone, preview } = this.state;
    const { addSupplierLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Add Supplier</CardTitle>
              </CardHeader>
              <CardBody>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Name</label>
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
                      {addSupplierLoading ? (
                        <Button color="primary" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <>
                          <Button color="primary">Submit</Button>
                          <Link
                            to="/admin/suppliers"
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
  addSupplierLoading: state.SupplierReducer.addSupplierLoading,
  addSupplierResult: state.SupplierReducer.addSupplierResult,
  addSupplierError: state.SupplierReducer.addSupplierError,

  refreshTokenError: state.AuthReducer.refreshTokenError,
  refreshTokenResult: state.AuthReducer.refreshTokenResult,
});

export default connect(mapStateToProps, null)(AddSupplier);
