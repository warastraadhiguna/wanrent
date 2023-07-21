import React from "react";
import { Col, Modal, ModalBody, ModalHeader, Row, Table } from "reactstrap";
import { numberWithCommas } from "utils";

const TransactionSummaryModal = ({
  modalToggle,
  handleClose,
  totalSummary,
  paidSummary,
  unpaidSummary,
}) => {
  return (
    <Modal isOpen={modalToggle} toggle={handleClose}>
      <ModalHeader toggle={handleClose} />
      <ModalBody>
        <h3 className="text-center">Transaction Summary</h3>
        <Row>
          <Col md={12}>
            <h5 className="text-dark">
              <Table borderless>
                <tbody>
                  <tr>
                    <td>Total Summary</td>
                    <td>:</td>
                    <td>Rp. {numberWithCommas(totalSummary)}</td>
                  </tr>
                  <tr>
                    <td>Paid Summary</td>
                    <td>:</td>
                    <td>Rp. {numberWithCommas(paidSummary)}</td>
                  </tr>
                  <tr>
                    <td>Unpaid Summary</td>
                    <td>:</td>
                    <td>Rp. {numberWithCommas(unpaidSummary)}</td>
                  </tr>
                </tbody>
              </Table>
            </h5>
          </Col>
        </Row>
      </ModalBody>
    </Modal>
  );
};

export default TransactionSummaryModal;
