import { refreshToken } from "actions/AuthAction";
import {
  getDetailSupplier,
  editSupplier,
} from "actions/supplier/SupplierAction";
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

class EditSupplier extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
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
      this.props.dispatch(editSupplier(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Fill all fields!!", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      editSupplierResult,
      editSupplierError,
      getDetailSupplierResult,
      getDetailSupplierError,
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
        getDetailSupplier(
          refreshTokenResult.accessToken,
          this.props.match.params.id
        )
      );
    }
    if (
      getDetailSupplierResult &&
      prevProps.getDetailSupplierResult !== getDetailSupplierResult
    ) {
      this.setState({
        name: getDetailSupplierResult.data.name,
        phone: getDetailSupplierResult.data.phone,
        file: getDetailSupplierResult.data.url,
        preview: getDetailSupplierResult.data.url,
      });
    }
    if (
      getDetailSupplierError &&
      prevProps.getDetailSupplierError !== getDetailSupplierError
    ) {
      swal("Error!", getDetailSupplierError.message, "error");
    }
    if (
      editSupplierResult &&
      prevProps.editSupplierResult !== editSupplierResult
    ) {
      swal("Success!", editSupplierResult.message, "success");
      this.props.history.push("/admin/suppliers");
    }
    if (
      editSupplierError &&
      prevProps.editSupplierError !== editSupplierError
    ) {
      swal("Error!", editSupplierError.message, "error");
    }
  }

  loadImage = (e) => {
    const file = e.target.files[0];
    this.setState({ file });
    this.setState({ preview: URL.createObjectURL(file) });
  };

  render() {
    const { name, phone, preview } = this.state;
    const { editSupplierLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Edit Supplier</CardTitle>
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
                      {editSupplierLoading ? (
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
  getDetailSupplierLoading: state.SupplierReducer.getDetailSupplierLoading,
  getDetailSupplierResult: state.SupplierReducer.getDetailSupplierResult,
  getDetailSupplierError: state.SupplierReducer.getDetailSupplierError,

  editSupplierLoading: state.SupplierReducer.editSupplierLoading,
  editSupplierResult: state.SupplierReducer.editSupplierResult,
  editSupplierError: state.SupplierReducer.editSupplierError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(EditSupplier);
