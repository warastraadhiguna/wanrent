import React from "react";
import { Col, FormGroup, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const ImageModal = ({ modalToggle, urlImageShow, handleClose }) => {
  return (
    <Modal isOpen={modalToggle} toggle={handleClose}>
      <ModalHeader toggle={handleClose} />
      <ModalBody className="text-center">
        <h3>Image</h3>
        <Row>
          <Col md={12}>
            <FormGroup>
              <img src={urlImageShow} alt={urlImageShow} />
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default ImageModal;
