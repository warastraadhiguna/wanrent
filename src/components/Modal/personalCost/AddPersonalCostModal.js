import React from "react";
import { useSelector } from "react-redux";
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
  Spinner,
} from "reactstrap";

export const AddPersonalCostModal = ({
  modalToggle,
  handleClose,
  handleSubmit,
  handleChange,
  id_supplier,
  total,
  note,
  personal_cost_date,
}) => {
  const { getSupplierResult, getSupplierLoading } = useSelector(
    (state) => state.SupplierReducer
  );

  return (
    <Modal
      autoFocus={false}
      size="md"
      isOpen={modalToggle}
      toggle={handleClose}
    >
      <ModalHeader toggle={handleClose} />
      <ModalBody className="text-center">
        <h3>Add Personal Cost</h3>
        <form onSubmit={(event) => handleSubmit(event)}>
          <Row>
            <Col md={12}>
              <FormGroup>
                <label>Supplier</label>
                {getSupplierLoading ? (
                  <Spinner size="sm" color="light" />
                ) : (
                  <Input
                    type="select"
                    name="id_supplier"
                    onChange={(event) => handleChange(event)}
                    value={id_supplier}
                    options={getSupplierResult.data}
                  >
                    {getSupplierResult &&
                      getSupplierResult.data.map((supplier, index) => (
                        <option key={index} value={supplier.id}>
                          {supplier.name}
                        </option>
                      ))}
                  </Input>
                )}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={personal_cost_date}
                  name="personal_cost_date"
                  onChange={(event) => handleChange(event)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
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
