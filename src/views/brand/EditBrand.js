import { refreshToken } from "actions/AuthAction";
import { getDetailBrand, editBrand } from "actions/brand/BrandAction";
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

class EditBrand extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
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
    const { name } = this.state;
    event.preventDefault();
    if (name) {
      this.props.dispatch(editBrand(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Fill all fields!!", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      editBrandResult,
      editBrandError,
      getDetailBrandResult,
      getDetailBrandError,
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
        getDetailBrand(
          refreshTokenResult.accessToken,
          this.props.match.params.id
        )
      );
    }
    if (
      getDetailBrandResult &&
      prevProps.getDetailBrandResult !== getDetailBrandResult
    ) {
      this.setState({
        name: getDetailBrandResult.data.name,
      });
    }
    if (
      getDetailBrandError &&
      prevProps.getDetailBrandError !== getDetailBrandError
    ) {
      swal("Error!", getDetailBrandError.message, "error");
    }
    if (editBrandResult && prevProps.editBrandResult !== editBrandResult) {
      swal("Success!", editBrandResult.message, "success");
      this.props.history.push("/admin/brands");
    }
    if (editBrandError && prevProps.editBrandError !== editBrandError) {
      swal("Error!", editBrandError.message, "error");
    }
  }

  render() {
    const { name } = this.state;
    const { editBrandLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Edit Brand</CardTitle>
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
                    <Col>
                      {editBrandLoading ? (
                        <Button color="primary" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <>
                          <Button color="primary">Submit</Button>
                          <Link to="/admin/brands" className="btn btn-warning">
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
  getDetailBrandLoading: state.BrandReducer.getDetailBrandLoading,
  getDetailBrandResult: state.BrandReducer.getDetailBrandResult,
  getDetailBrandError: state.BrandReducer.getDetailBrandError,

  editBrandLoading: state.BrandReducer.editBrandLoading,
  editBrandResult: state.BrandReducer.editBrandResult,
  editBrandError: state.BrandReducer.editBrandError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(EditBrand);
