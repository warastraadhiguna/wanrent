import { refreshToken } from "actions/AuthAction";
import { getDetailUser, editUser } from "actions/user/UserAction";
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

class EditUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.match.params.id,
      name: "",
      username: "",
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
    const { name, username } = this.state;
    event.preventDefault();
    if (name && username) {
      this.props.dispatch(editUser(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Fill all fields!!", "error");
    }
  };

  componentDidUpdate(prevProps) {
    const {
      editUserResult,
      editUserError,
      getDetailUserResult,
      getDetailUserError,
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
        getDetailUser(
          refreshTokenResult.accessToken,
          this.props.match.params.id
        )
      );
    }
    if (
      getDetailUserResult &&
      prevProps.getDetailUserResult !== getDetailUserResult
    ) {
      this.setState({
        name: getDetailUserResult.data.name,
        username: getDetailUserResult.data.username,
        file: getDetailUserResult.data.url,
        preview: getDetailUserResult.data.url,
      });
    }
    if (
      getDetailUserError &&
      prevProps.getDetailUserError !== getDetailUserError
    ) {
      swal("Error!", getDetailUserError.message, "error");
    }
    if (editUserResult && prevProps.editUserResult !== editUserResult) {
      swal("Success!", editUserResult.message, "success");
      this.props.history.push("/admin/users");
    }
    if (editUserError && prevProps.editUserError !== editUserError) {
      swal("Error!", editUserError.message, "error");
    }
  }

  loadImage = (e) => {
    const file = e.target.files[0];
    this.setState({ file });
    this.setState({ preview: URL.createObjectURL(file) });
  };

  render() {
    const { name, username, preview } = this.state;
    const { editUserLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Edit User</CardTitle>
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
                      {editUserLoading ? (
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
  getDetailUserLoading: state.UserReducer.getDetailUserLoading,
  getDetailUserResult: state.UserReducer.getDetailUserResult,
  getDetailUserError: state.UserReducer.getDetailUserError,

  editUserLoading: state.UserReducer.editUserLoading,
  editUserResult: state.UserReducer.editUserResult,
  editUserError: state.UserReducer.editUserError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(EditUser);
