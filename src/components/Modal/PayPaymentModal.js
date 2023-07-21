import React from "react";
import {
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

const PayPaymentModal = ({
  modalToggle,
  handleClose,
  totalAddPayment,
  handleSubmit,
  handleChange,
}) => {
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
                <Input
                  type="number"
                  value={totalAddPayment}
                  placeholder={"Total"}
                  name="totalAddPayment"
                  autoComplete="off"
                  autoFocus={true}
                  onChange={(event) => handleChange(event)}
                />
              </FormGroup>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default PayPaymentModal;
