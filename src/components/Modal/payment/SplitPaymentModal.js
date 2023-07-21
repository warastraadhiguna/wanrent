import { editPayment } from "actions/payment/PaymentAction";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import swal from "sweetalert";
import { numberWithCommas } from "utils";

const SplitPaymentModal = ({
  modalToggle,
  handleClose,
  accessToken,
  idPayment,
  currentTotal,
}) => {
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNaN(+total)) {
      swal("Error", "Fill number!!", "error");
      return;
    }

    if (currentTotal && total >= currentTotal) {
      swal("Error", "Total split bigger than current total!!", "error");
      return;
    }
    swal({
      title: "Are you sure to split payment?",
      text: "Split Payment ",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willSplit) => {
      if (willSplit) {
        dispatch(editPayment(accessToken, { idPayment, total, currentTotal }));
        handleClose();
        setTotal(0);
      }
    });
  };

  return (
    <Modal
      autoFocus={false}
      size="sm"
      isOpen={modalToggle}
      toggle={handleClose}
    >
      <ModalHeader toggle={handleClose} />
      <ModalBody className="text-center">
        <h3>Split Payment</h3>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <label>Current Total : {numberWithCommas(currentTotal)}</label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <label>Total Split</label>
                <Input
                  type="number"
                  name="total"
                  onChange={(event) => setTotal(event.target.value)}
                  value={total}
                  autoFocus={true}
                />
              </FormGroup>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default SplitPaymentModal;
