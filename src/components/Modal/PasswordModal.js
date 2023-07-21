import React from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";

export const PasswordModal = ({
  modalPasswordToggle,
  handleClose,
  name,
  password,
  editUserLoading,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Modal isOpen={modalPasswordToggle} toggle={handleClose}>
      <ModalHeader toggle={handleClose} />
      <ModalBody className="text-center">
        <h3>Change Password</h3>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Input
                  type="text"
                  value={name}
                  name="name"
                  autoComplete="off"
                  disabled
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Input
                  type="password"
                  value={password}
                  name="password"
                  autoComplete="off"
                  onChange={handleChange}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              {editUserLoading ? (
                <Button color="primary" disabled>
                  <Spinner size="sm" color="light" /> Loading
                </Button>
              ) : (
                <>
                  <Button color="primary">Submit</Button>
                  <Button color="warning" onClick={handleClose}>
                    Cancel
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};
