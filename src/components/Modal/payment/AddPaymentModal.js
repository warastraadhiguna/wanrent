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
import { addPayment } from "actions/payment/PaymentAction";

const AddPaymentModal = ({
  modalToggle,
  handleClose,
  accessToken,
  idTransaction,
  unpaid,
}) => {
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isNaN(+total)) {
      swal("Error", "Fill number!!", "error");
      return;
    }

    if (unpaid && total > unpaid) {
      swal("Error", "Payment bigger than unpaid!!", "error");
      return;
    }

    dispatch(addPayment(accessToken, { idTransaction, total, unpaid }));
    handleClose();
    setTotal(0);
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
        <h3>Add Payment</h3>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <label>Total</label>
                <Input
                  type="number"
                  name="total"
                  onChange={(event) => setTotal(event.target.value)}
                  value={total}
                  autoFocus={true}
                  required
                />
              </FormGroup>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddPaymentModal;
