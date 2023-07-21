import { refreshToken } from "actions/AuthAction";
import { addUser } from "../../actions/user/UserAction";
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

class AddUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      username: "",
      password: "",
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
    const { name, username, password } = this.state;
    event.preventDefault();
    if (name && username && password) {
      this.props.dispatch(addUser(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Semua field harus diisi", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      addUserResult,
      addUserError,
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

    if (addUserResult && prevProps.addUserResult !== addUserResult) {
      swal("Success!", addUserResult.message, "success");
      this.props.history.push("/admin/users");
    }
    if (addUserError && prevProps.addUserError !== addUserError) {
      swal("Error!", addUserError.message, "error");
    }
  }

  loadImage = (e) => {
    const file = e.target.files[0];
    this.setState({ file });
    this.setState({ preview: URL.createObjectURL(file) });
  };

  render() {
    const { name, username, password, preview } = this.state;
    const { addUserLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Add User</CardTitle>
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
                        <label>Username</label>
                        <Input
                          type="text"
                          value={username}
                          name="username"
                          autoComplete="off"
                          onChange={(event) => this.handleChange(event)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          type="password"
                          value={password}
                          name="password"
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
                      {addUserLoading ? (
                        <Button color="primary" disabled>
                          <Spinner size="sm" color="light" /> Loading
                        </Button>
                      ) : (
                        <>
                          <Button color="primary">Submit</Button>
                          <Link to="/admin/users" className="btn btn-warning">
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
  addUserLoading: state.UserReducer.addUserLoading,
  addUserResult: state.UserReducer.addUserResult,
  addUserError: state.UserReducer.addUserError,

  refreshTokenError: state.AuthReducer.refreshTokenError,
  refreshTokenResult: state.AuthReducer.refreshTokenResult,
});

export default connect(mapStateToProps, null)(AddUser);
