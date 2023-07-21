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

const CustomerDetailModal = ({ modalToggle, customer, handleClose }) => {
  return (
    <Modal size="lg" isOpen={modalToggle} toggle={handleClose}>
      <ModalHeader toggle={handleClose} />
      <ModalBody className="text-center">
        <h3>Detail Customer</h3>
        <Row>
          <Col md={6}>
            <FormGroup>
              <label>Name</label>
              <Input
                type="text"
                value={customer ? customer.name : ""}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <label>Phone</label>
              <Input
                type="text"
                value={customer ? customer.phone : ""}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <label>Image</label>
              <br />
              <img src={customer ? customer.url : ""} alt={"Img"} width={500} />
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default CustomerDetailModal;
