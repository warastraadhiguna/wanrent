import { refreshToken } from "actions/AuthAction";
import { addBrand } from "../../actions/brand/BrandAction";
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

class AddBrand extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      this.props.dispatch(addBrand(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Semua field harus diisi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      addBrandResult,
      addBrandError,
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

    if (addBrandResult && prevProps.addBrandResult !== addBrandResult) {
      swal("Success!", addBrandResult.message, "success");
      this.props.history.push("/admin/brands");
    }
    if (addBrandError && prevProps.addBrandError !== addBrandError) {
      swal("Error!", addBrandError.message, "error");
    }
  }

  render() {
    const { name } = this.state;
    const { addBrandLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Add Brand</CardTitle>
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
                    <Col>
                      {addBrandLoading ? (
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
  addBrandLoading: state.BrandReducer.addBrandLoading,
  addBrandResult: state.BrandReducer.addBrandResult,
  addBrandError: state.BrandReducer.addBrandError,

  refreshTokenError: state.AuthReducer.refreshTokenError,
  refreshTokenResult: state.AuthReducer.refreshTokenResult,
});

export default connect(mapStateToProps, null)(AddBrand);
