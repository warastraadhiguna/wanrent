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

const OwnershipDetailModal = ({ modalToggle, ownership, handleClose }) => {
  return (
    <Modal size="lg" isOpen={modalToggle} toggle={handleClose}>
      <ModalHeader toggle={handleClose} />
      <ModalBody className="text-center">
        <h3>Detail Ownership</h3>
        <Row>
          <Col md={6}>
            <FormGroup>
              <label>Type</label>
              <Input
                type="text"
                value={ownership ? ownership.vehicle.type.name : ""}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <label>Supplier</label>
              <Input
                type="text"
                value={ownership ? ownership.supplier.name : ""}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <label>Brand</label>
              <Input
                type="text"
                value={ownership ? ownership.vehicle.brand.name : ""}
                disabled
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <label>Detail Type</label>
              <Input
                type="text"
                value={ownership ? ownership.vehicle.detail_type : ""}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormGroup>
              <label>Code</label>
              <Input
                type="text"
                value={ownership ? ownership.code : ""}
                disabled
              />
            </FormGroup>
          </Col>

          <Col md={6}>
            <FormGroup>
              <label>Licence Plate</label>
              <Input
                type="text"
                value={ownership ? ownership.licence_plate : ""}
                disabled
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
              <label>Note</label>
              <Input
                type="textarea"
                value={ownership ? ownership.note : ""}
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
              <img
                src={ownership ? ownership.url : ""}
                alt={"Img"}
                width={500}
              />
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default OwnershipDetailModal;
