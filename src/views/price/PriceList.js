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
import { getPriceList, deletePrice } from "../../actions/price/PriceAction";
import { numberWithCommas } from "utils";

class PriceList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accessToken: "",
    };
  }

  componentDidMount() {
    this.props.dispatch(refreshToken());
  }

  componentDidUpdate(prevProps) {
    const {
      deletePriceResult,
      deletePriceError,
      getPriceError,
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
      this.props.dispatch(getPriceList(refreshTokenResult.accessToken));
    }

    if (getPriceError && prevProps.getPriceError !== getPriceError) {
      swal("Error!", getPriceError.message, "error");
      this.props.history.push("/admin/dashboard");
    }
    if (
      deletePriceResult &&
      prevProps.deletePriceResult !== deletePriceResult
    ) {
      swal("Success!", deletePriceResult.message, "success");
      this.props.dispatch(getPriceList(this.state.accessToken));
    }
    if (deletePriceError && prevProps.deletePriceError !== deletePriceError) {
      swal("Error!", deletePriceError.message, "error");
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
        this.props.dispatch(deletePrice(this.state.accessToken, id));
      }
    });
  };

  render() {
    const { getPriceLoading, getPriceResult } = this.props;
    return (
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Master Price</CardTitle>
                <Link
                  to="/admin/price/add"
                  className="btn btn-primary float-right"
                >
                  Tambah Price
                </Link>
              </CardHeader>
              <CardBody>
                <Table>
                  <thead className="text-primary">
                    <tr>
                      <th width="5%">No</th>
                      <th>Type</th>
                      <th>Time (Hour)</th>
                      <th>Price (Rupiah)</th>
                      <th width="20%">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getPriceResult ? (
                      getPriceResult.data.map((price, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{price.type.name}</td>
                          <td>{price.time / 60}</td>
                          <td>{numberWithCommas(price.price)}</td>
                          <td align="center">
                            <Link
                              className="btn btn-warning"
                              to={"/admin/price/edit/" + price.id}
                            >
                              <i className="nc-icon nc-ruler-pencil"></i> Edit
                            </Link>
                            <Button
                              color="danger"
                              className="ml-2"
                              onClick={() => this.deleteData(price.id)}
                            >
                              <i className="nc-icon nc-basket"></i> Delete
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : getPriceLoading ? (
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
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  getPriceLoading: state.PriceReducer.getPriceLoading,
  getPriceResult: state.PriceReducer.getPriceResult,
  getPriceError: state.PriceReducer.getPriceError,

  deletePriceLoading: state.PriceReducer.deletePriceLoading,
  deletePriceResult: state.PriceReducer.deletePriceResult,
  deletePriceError: state.PriceReducer.deletePriceError,

  refreshTokenResult: state.AuthReducer.refreshTokenResult,
  refreshTokenError: state.AuthReducer.refreshTokenError,
});

export default connect(mapStateToProps, null)(PriceList);
