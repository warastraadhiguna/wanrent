import React, { useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import ChooseCustomerModal from "../customer/ChooseCustomerModal";

export const AddOrderModal = ({
  modalToggle,
  handleClose,
  handleSubmit,
  handleChange,
  customer,
  note,
  order_date,
  accessToken,
  chooseCustomer,
}) => {
  const [modalChooseCustomerToggle, setModalChooseCustomerToggle] =
    useState(false);

  return (
    <>
      <Modal
        autoFocus={false}
        size="md"
        isOpen={modalToggle}
        toggle={handleClose}
      >
        <ModalHeader toggle={handleClose} />
        <ModalBody className="text-center">
          <h3>Add Order</h3>
          <form onSubmit={(event) => handleSubmit(event)}>
            <Row>
              <Col md={4}>
                <FormGroup>
                  <Label>Date</Label>
                  <Input
                    type="date"
                    value={order_date}
                    name="order_date"
                    onChange={(event) => handleChange(event)}
                  />
                </FormGroup>
              </Col>
              <Col md={8}>
                <FormGroup>
                  <Label>Customer</Label>
                  <InputGroup>
                    <Input
                      type="text"
                      value={customer ? customer.name : ""}
                      name="name"
                      disabled
                    />
                    <InputGroupAddon
                      title="Search"
                      addonType="append"
                      onClick={() => {
                        setModalChooseCustomerToggle(true);
                      }}
                    >
                      <InputGroupText className="bg-warning text-dark">
                        <i className="nc-icon nc-zoom-split ml-2" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
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
      <ChooseCustomerModal
        modalToggle={modalChooseCustomerToggle}
        handleClose={() => setModalChooseCustomerToggle(false)}
        chooseCustomer={chooseCustomer}
        accessToken={accessToken}
      />
    </>
  );
};
