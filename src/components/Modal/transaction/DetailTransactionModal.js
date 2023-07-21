import { endTransaction } from "actions/transaction/TransactionAction";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Button,
  Spinner,
} from "reactstrap";
import swal from "sweetalert";
import { numberWithCommas } from "utils";
import CustomerDetailModal from "../CustomerDetailModal";
import OwnershipDetailModal from "../OwnershipDetailModal";

function DetailTransactionModal({ accessToken, modalToggle, handleClose }) {
  const dispatch = useDispatch();
  const { getDetailTransactionByCodeResult, endTransactionLoading } =
    useSelector((state) => state.TransactionReducer);
  const [detailData, setDetailData] = useState(false);
  const [modalOwnershipDetailToggle, setModalOwnershipDetailToggle] =
    useState(false);
  const [modalCustomerDetailToggle, setModalCustomerDetailToggle] =
    useState(false);
  const [total, setTotal] = useState(0);
  const [downPayment, setDownPayment] = useState(0);
  const [openDownPayment, setOpenDownPayment] = useState(0);

  useEffect(() => {
    if (getDetailTransactionByCodeResult) {
      setDetailData(getDetailTransactionByCodeResult.data);
      setTotal(
        getDetailTransactionByCodeResult.data
          ? getDetailTransactionByCodeResult.data.totalCalculated
          : 0
      );
      setDownPayment(
        getDetailTransactionByCodeResult.data
          ? getDetailTransactionByCodeResult.data.totalCalculated
          : 0
      );
    }
  }, [getDetailTransactionByCodeResult]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNaN(+total) || isNaN(+downPayment)) {
      swal("Error", "Fill number!!", "error");
      return;
    }

    if (parseInt(total) === 0) {
      swal("Error", "Total should be more than zero (0)!!", "error");
      return;
    }

    if (parseInt(downPayment) > parseInt(total)) {
      swal(
        "Error",
        "Total should be bigger or equal than Down Payment!!",
        "error"
      );
      return;
    }
    const data = {
      id: detailData ? detailData.id : "",
      total,
      downPayment,
    };
    setOpenDownPayment(false);
    dispatch(endTransaction(accessToken, data));
  };

  return (
    <div>
      <Modal
        size="lg"
        isOpen={modalToggle}
        toggle={handleClose}
        autoFocus={false}
      >
        <ModalHeader toggle={handleClose} />
        <ModalBody className="text-center">
          <h3>Detail</h3>
          <form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <label>Vehicle</label>
                  <InputGroup>
                    <Input
                      type="text"
                      value={
                        detailData && detailData.ownership
                          ? detailData.ownership.code
                          : ""
                      }
                      name="code"
                      disabled
                    />
                    <InputGroupAddon
                      addonType="append"
                      title="Info"
                      onClick={() => {
                        setModalOwnershipDetailToggle(true);
                      }}
                    >
                      <InputGroupText className="bg-info text-dark">
                        <i className="nc-icon nc-alert-circle-i ml-2" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <label>Customer</label>
                  <InputGroup>
                    <Input
                      type="text"
                      value={
                        detailData.customer ? detailData.customer.name : ""
                      }
                      name="code"
                      disabled
                    />
                    <InputGroupAddon
                      addonType="append"
                      title="Info"
                      onClick={() => {
                        setModalCustomerDetailToggle(true);
                      }}
                    >
                      <InputGroupText className="bg-info text-dark">
                        <i className="nc-icon nc-alert-circle-i ml-2" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <label>Time In</label>
                  <Input
                    type="text"
                    value={moment(detailData.time_in).format(
                      "dddd, DD MMMM YYYY HH:mm:ss"
                    )}
                    name="time_in"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <label>Note</label>
                  <Input
                    type="textarea"
                    value={detailData.note ? detailData.note : ""}
                    name="note"
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <label>Time Out</label>
                  <Input
                    type="text"
                    value={moment(detailData.time_out).format(
                      "dddd, DD MMMM YYYY HH:mm:ss"
                    )}
                    name="time_in"
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <label>Time Total</label>
                  <Input
                    type="text"
                    value={
                      detailData.totalTimeString
                        ? detailData.totalTimeString
                        : ""
                    }
                    disabled
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <label>Total by system</label>
                  <Input
                    type="text"
                    value={
                      detailData.totalCalculated
                        ? "Rp " + numberWithCommas(detailData.totalCalculated)
                        : "0"
                    }
                    disabled
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <label>Total Real</label>
                  <InputGroup>
                    <Input
                      type="number"
                      name="total"
                      onChange={(event) => {
                        setTotal(event.target.value);
                        if (!openDownPayment)
                          setDownPayment(event.target.value);
                      }}
                      value={total}
                      autoFocus={true}
                      required
                    />
                    <InputGroupAddon
                      addonType="append"
                      title="Credit"
                      onClick={() => {
                        if (!openDownPayment) {
                          setDownPayment(0);
                          setOpenDownPayment(true);
                        } else {
                          setDownPayment(total);
                          setOpenDownPayment(false);
                        }
                      }}
                    >
                      <InputGroupText className="bg-success text-dark">
                        <i className="nc-icon nc-single-copy-04 ml-2" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
            </Row>
            {openDownPayment ? (
              <Row>
                <Col md={6}></Col>
                <Col md={6}>
                  <FormGroup>
                    <label>Down Payment</label>
                    <Input
                      type="number"
                      name="downPayment"
                      onChange={(event) => setDownPayment(event.target.value)}
                      value={downPayment}
                      required
                    />
                  </FormGroup>
                </Col>
              </Row>
            ) : (
              <></>
            )}

            <Row>
              <Col>
                {endTransactionLoading ? (
                  <Button color="primary" disabled>
                    <Spinner size="sm" color="light" /> Loading
                  </Button>
                ) : (
                  <>
                    <Button color="primary">Submit</Button>
                    <Button onClick={handleClose} className="btn btn-warning">
                      Cancel
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <OwnershipDetailModal
        modalToggle={modalOwnershipDetailToggle}
        ownership={detailData.ownership}
        handleClose={() => setModalOwnershipDetailToggle(false)}
      />

      <CustomerDetailModal
        modalToggle={modalCustomerDetailToggle}
        customer={detailData.customer}
        handleClose={() => setModalCustomerDetailToggle(false)}
      />
    </div>
  );
}

export default DetailTransactionModal;
