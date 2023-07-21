import React from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

export const AddCostModal = ({
  modalToggle,
  handleClose,
  handleSubmit,
  handleChange,
  code,
  total,
  note,
  cost_date,
}) => {
  return (
    <Modal
      autoFocus={false}
      size="md"
      isOpen={modalToggle}
      toggle={handleClose}
    >
      <ModalHeader toggle={handleClose} />
      <ModalBody className="text-center">
        <h3>Add Cost</h3>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Row>
            <Col md={3}>
              <FormGroup>
                <Label>Code</Label>
                <Input
                  type="text"
                  value={code}
                  placeholder={"Vehicle Code"}
                  name="code"
                  autoComplete="off"
                  autoFocus={true}
                  onChange={(event) => handleChange(event)}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={cost_date}
                  name="cost_date"
                  onChange={(event) => handleChange(event)}
                />
              </FormGroup>
            </Col>
            <Col md={5}>
              <FormGroup>
                <Label>Total</Label>
                <Input
                  type="number"
                  value={total}
                  name="total"
                  onChange={(event) => handleChange(event)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                <Label>Note</Label>
                <Input
                  type="textarea"
                  value={note}
                  name="note"
                  onChange={(event) => handleChange(event)}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Button type="submit" color="success">
                Save
              </Button>
              <Button type="button" color="warning" onClick={handleClose}>
                Cancel
              </Button>
            </Col>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );
};
