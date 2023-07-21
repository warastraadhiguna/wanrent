import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
  Spinner,
  Table,
} from "reactstrap";
import { connect } from "react-redux";
import swal from "sweetalert";
import { refreshToken } from "actions/AuthAction";
import {
  getUserList,
  deleteUser,
  editUser,
} from "../../actions/user/UserAction";
import ImageModal from "components/Modal/ImageModal";
import { PasswordModal } from "components/Modal/PasswordModal";

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      name: "",
      password: "",
      modalPasswordToggle: false,
      modalImageToggle: false,
      accessToken: "",
      urlImageShow: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      deleteUserResult,
      deleteUserError,
      editUserResult,
      editUserError,
      getUserError,
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
      this.props.dispatch(getUserList(refreshTokenResult.accessToken));
    }

    if (getUserError && prevProps.getUserError !== getUserError) {
      swal("Error!", getUserError.message, "error");
      this.props.history.push("/admin/dashboard");
    }
    if (deleteUserResult && prevProps.deleteUserResult !== deleteUserResult) {
      swal("Success!", deleteUserResult.message, "success");
      this.props.dispatch(getUserList(this.state.accessToken));
    }
    if (deleteUserError && prevProps.deleteUserError !== deleteUserError) {
      swal("Error!", deleteUserError.message, "error");
    }
    if (editUserResult && prevProps.editUserResult !== editUserResult) {
      swal("Success!", editUserResult.message, "success");
      this.setState({ modalPasswordToggle: false, password: "" });
    }
    if (editUserError && prevProps.editUserError !== editUserError) {
      swal("Error!", editUserError.message, "error");
      this.setState({ modalPasswordToggle: false, password: "" });
    }
  }

  deleteData = (id) => {
    swal({
      title: "Are you sure?",
      text: "Delete data success",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        this.props.dispatch(deleteUser(this.state.accessToken, id));
      }
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    const { password } = this.state;
    event.preventDefault();
    if (password) {
      this.props.dispatch(editUser(this.state.accessToken, this.state));
    } else {
      swal("Failed!", "Fill the password!", "error");
    }
  };

  render() {
    const {
      name,
      password,
      modalPasswordToggle,
      modalImageToggle,
      urlImageShow,
    } = this.state;
    const { getUserLoading, getUserResult, editUserLoading } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master User</CardTitle>
                <Link
                  to="/admin/user/add"
                  className="btn btn-primary float-right"
                >
                  Tambah User
                </Link>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>No</th>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Image</th>
                      <th width="30%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getUserResult ? (
                      getUserResult.data.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{user.name}</td>
                          <td>{user.username}</td>
                          <td>
                            <img
                              src={user.url}
                              alt={user.image}
                              width={100}
                              onClick={() => {
                                this.setState({
                                  modalImageToggle: true,
                                  urlImageShow: user.url,
                                });
                              }}
                            />
                          </td>
                          <td align="center">
                            <Button
                              color="secondary"
                              className="mr-2 mb-2"
                              onClick={() => {
                                this.setState({
                                  modalPasswordToggle: true,
                                  id: user.id,
                                  name: user.name,
                                });
                              }}
                            >
                              <i className="nc-icon nc-touch-id"></i> Pass
                            </Button>
                            {user.username !== "superadmin" && (
                              <>
                                <Link
                                  className="btn btn-warning mr-2 mb-2"
                                  to={"/admin/user/edit/" + user.id}
                                >
                                  <i className="nc-icon nc-ruler-pencil"></i>{" "}
                                  Edit
                                </Link>

                                <Button
                                  color="danger"
                                  className="mr-2 mb-2"
                                  onClick={() => this.deleteData(user.id)}
                                >
                                  <i className="nc-icon nc-basket"></i> Delete
                                </Button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : getUserLoading ? (
                      <tr>
                        <td colSpan={5} align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={5} align="center">
                          Data Kosong
                        </td>
                      </tr>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <PasswordModal
          modalPasswordToggle={modalPasswordToggle}
          handleClose={() => this.setState({ modalPasswordToggle: false })}
          name={name}
          password={password}
          editUserLoading={editUserLoading}
          handleChange={(event) => this.handleChange(event)}
          handleSubmit={(event) => this.handleSubmit(event)}
        />
        <ImageModal
          modalToggle={modalImageToggle}
          urlImageShow={urlImageShow}
          handleClose={() => this.setState({ modalImageToggle: false })}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getUserLoading: state.UserReducer.getUserLoading,
  getUserResult: state.UserReducer.getUserResult,
  getUserError: state.UserReducer.getUserError,

  deleteUserLoading: state.UserReducer.deleteUserLoading,
  deleteUserResult: state.UserReducer.deleteUserResult,
  deleteUserError: state.UserReducer.deleteUserError,

  editUserLoading: state.UserReducer.editUserLoading,
  editUserResult: state.UserReducer.editUserResult,
  editUserError: state.UserReducer.editUserError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(UserList);
