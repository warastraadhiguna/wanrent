import moment from "moment";
import React from "react";
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { numberWithCommas } from "utils";

const PersonalDebtPaymentListModal = ({
  modalToggle,
  handleClose,
  addModalToggle,
  choosenPersonalDebt,
  totalPaymentByName,
  handleDeletePaymentData,
}) => {
  return (
    <Modal
      autoFocus={false}
      size="lg"
      isOpen={modalToggle}
      toggle={handleClose}
    >
      <ModalHeader toggle={handleClose} />
      <ModalBody>
        <h3 className="text-center">Payment List</h3>
        <Button
          className="btn btn-success float-right"
          onClick={addModalToggle}
        >
          Add Payment
        </Button>
        <Table bordered striped responsive>
          <thead className="text-primary">
            <tr>
              <th width="5%">No</th>
              <th>Payment Date</th>
              <th>Total Payment</th>
              <th width="15%">Action</th>
            </tr>
          </thead>
          <tbody>
            {choosenPersonalDebt ? (
              choosenPersonalDebt[0].personal_debt_payments.map(
                (personalDebt, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {moment(personalDebt.createdAt).format(
                        "dddd, DD MMMM YYYY HH:mm:ss"
                      )}
                    </td>
                    <td>{numberWithCommas(personalDebt.total)}</td>
                    <td>
                      <Button
                        color="danger"
                        className="mr-2 mb-2"
                        onClick={() => handleDeletePaymentData(personalDebt.id)}
                      >
                        <i className="nc-icon nc-basket"></i> Delete
                      </Button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan={4} align="center">
                  Data Kosong
                </td>
              </tr>
            )}
            <tr className="font-weight-bold">
              <td colSpan={2} className="text-center">
                TOTAL
              </td>
              <td colSpan={2}>Rp. {numberWithCommas(totalPaymentByName)}</td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default PersonalDebtPaymentListModal;
