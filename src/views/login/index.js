import { refreshToken } from "actions/AuthAction";
import { loginUser } from "actions/AuthAction";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Input,
  Label,
  Row,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import { getLocalStorage } from "utils";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
    };
  }

  componentDidMount() {
    if (getLocalStorage("user")) this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const { loginUserResult, loginUserError, refreshTokenResult } = this.props;
    if (loginUserResult && prevProps.loginUserResult !== loginUserResult) {
      swal("Success!", "Selamat datang", "success");
      this.props.history.push("/admin/dashboard");
    }

    if (loginUserError && prevProps.loginUserError !== loginUserError) {
      swal("Error!", loginUserError.message, "error");
    }

    if (
      refreshTokenResult &&
      prevProps.refreshTokenResult !== refreshTokenResult
    ) {
      this.props.history.push("/admin/dashboard");
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { username, password } = this.state;
    event.preventDefault();
    if (username && password) {
      this.props.dispatch(loginUser(username, password));
    } else {
      swal("Error", "Isi semua field", "error");
    }
  };
  render() {
    const { password, username } = this.state;
    const { loginUserLoading } = this.props;
    return (
      <Row className="justify-content-center mt-5">
        <Col md="4" className="mt-5">
          <Card style={{ backgroundColor: "#f1f1f1" }}>
            <CardHeader tag="h4" className="m-auto align-self-center">
              Login
            </CardHeader>
            <CardBody>
              <form onSubmit={(event) => this.handleSubmit(event)}>
                <FormGroup>
                  <Label for="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Username"
                    onChange={(event) => this.handleChange(event)}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="password">Password</Label>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Password"
                    onChange={(event) => this.handleChange(event)}
                  ></Input>
                </FormGroup>

                {loginUserLoading ? (
                  <Button color="primary" disabled>
                    <Spinner size="sm" color="light" /> Loading
                  </Button>
                ) : (
                  <Button color="primary" type="submit">
                    Login
                  </Button>
                )}
              </form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => ({
  loginUserLoading: state.AuthReducer.loginUserLoading,
  loginUserResult: state.AuthReducer.loginUserResult,
  loginUserError: state.AuthReducer.loginUserError,
  refreshTokenResult: state.AuthReducer.refreshTokenResult,
});

export default connect(mapStateToProps, null)(Login);
