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
  getOwnershipList,
  deleteOwnership,
} from "../../actions/ownership/OwnershipAction";
import ImageModal from "components/Modal/ImageModal";
import { SearchComponent } from "components/Table";
import { numberWithCommas } from "utils";

class OwnershipList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalImageToggle: false,
      accessToken: "",
      urlImageShow: "",

      searchedText: "",
      keyword: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      deleteOwnershipResult,
      deleteOwnershipError,
      getOwnershipError,
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
      this.props.dispatch(getOwnershipList(refreshTokenResult.accessToken));
    }

    if (
      getOwnershipError &&
      prevProps.getOwnershipError !== getOwnershipError
    ) {
      swal("Error!", getOwnershipError.message, "error");
      this.props.history.push("/admin/dashboard");
    }
    if (
      deleteOwnershipResult &&
      prevProps.deleteOwnershipResult !== deleteOwnershipResult
    ) {
      swal("Success!", deleteOwnershipResult.message, "success");
      this.props.dispatch(getOwnershipList(this.state.accessToken));
    }
    if (
      deleteOwnershipError &&
      prevProps.deleteOwnershipError !== deleteOwnershipError
    ) {
      swal("Error!", deleteOwnershipError.message, "error");
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
        this.props.dispatch(deleteOwnership(this.state.accessToken, id));
      }
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  filterHandleSubmit = (event) => {
    const { keyword } = this.state;
    event.preventDefault();
    this.setState({ searchedText: keyword });
  };

  render() {
    const { modalImageToggle, urlImageShow, keyword, searchedText } =
      this.state;
    const { getOwnershipLoading, getOwnershipResult } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Ownership</CardTitle>

                <Link
                  to="/admin/ownership/add"
                  className="btn btn-primary float-right">
                  Tambah Ownership
                </Link>
              </CardHeader>
              <CardBody>
                <SearchComponent
                  keyword={keyword}
                  searchedText={searchedText}
                  keywordHandleSubmit={this.filterHandleSubmit}
                  handleChange={this.handleChange}
                />
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th width="5%">No</th>
                      <th width="20%">Detail</th>
                      <th width="20%">Supplier</th>
                      <th>Image</th>
                      <th>Note</th>
                      <th width="20%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getOwnershipResult ? (
                      getOwnershipResult.data
                        .filter(
                          (ownership) =>
                            ownership.licence_plate
                              .toLowerCase()
                              .includes(searchedText.toLowerCase()) ||
                            ownership.code
                              .toLowerCase()
                              .includes(searchedText.toLowerCase()) ||
                            ownership.supplier.name
                              .toLowerCase()
                              .includes(searchedText.toLowerCase())
                        )
                        .map((ownership, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              <Table borderless>
                                <tbody>
                                  <tr>
                                    <td>Type</td>
                                    <td width="1%">:</td>
                                    <td>{ownership.vehicle.type.name}</td>
                                  </tr>
                                  <tr>
                                    <td>Brand</td>
                                    <td>:</td>
                                    <td>{ownership.vehicle.brand.name}</td>
                                  </tr>
                                  <tr>
                                    <td>Detail Type </td>
                                    <td>:</td>
                                    <td>{ownership.vehicle.detail_type}</td>
                                  </tr>
                                  <tr>
                                    <td>Code</td>
                                    <td width="1%">:</td>
                                    <td> {ownership.code}</td>
                                  </tr>
                                  <tr>
                                    <td>Licence Plate</td>
                                    <td>:</td>
                                    <td>{ownership.licence_plate}</td>
                                  </tr>
                                </tbody>
                              </Table>
                            </td>
                            <td>
                              <Table borderless>
                                <tbody>
                                  <tr>
                                    <td>Name</td>
                                    <td width="1%">:</td>
                                    <td>{ownership.supplier.name}</td>
                                  </tr>
                                  <tr>
                                    <td>Phone</td>
                                    <td>:</td>
                                    <td>{ownership.supplier.phone}</td>
                                  </tr>
                                  <tr>
                                    <td>Target Value (Rupiah/Month)</td>
                                    <td>:</td>
                                    <td>
                                      {numberWithCommas(ownership.target_value)}
                                    </td>
                                  </tr>
                                </tbody>
                              </Table>
                            </td>
                            <td>
                              <img
                                src={ownership.url}
                                alt={ownership.image}
                                width={100}
                                onClick={() => {
                                  this.setState({
                                    modalImageToggle: true,
                                    urlImageShow: ownership.url,
                                  });
                                }}
                              />
                            </td>
                            <td>{ownership.note}</td>
                            <td align="center">
                              <Link
                                className="btn btn-warning mr-2 mb-2"
                                to={"/admin/ownership/edit/" + ownership.id}>
                                <i className="nc-icon nc-ruler-pencil"></i> Edit
                              </Link>
                              <Button
                                color="danger"
                                className="mr-2 mb-2"
                                onClick={() => this.deleteData(ownership.id)}>
                                <i className="nc-icon nc-basket"></i> Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                    ) : getOwnershipLoading ? (
                      <tr>
                        <td colSpan={6} align="center">
                          <Spinner color="primary" />
                        </td>
                      </tr>
                    ) : (
                      <tr>
                        <td colSpan={6} align="center">
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
  getOwnershipLoading: state.OwnershipReducer.getOwnershipLoading,
  getOwnershipResult: state.OwnershipReducer.getOwnershipResult,
  getOwnershipError: state.OwnershipReducer.getOwnershipError,

  deleteOwnershipLoading: state.OwnershipReducer.deleteOwnershipLoading,
  deleteOwnershipResult: state.OwnershipReducer.deleteOwnershipResult,
  deleteOwnershipError: state.OwnershipReducer.deleteOwnershipError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(OwnershipList);
