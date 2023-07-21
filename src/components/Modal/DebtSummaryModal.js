import React from "react";
import { Col, Modal, ModalBody, ModalHeader, Row, Table } from "reactstrap";
import { numberWithCommas } from "utils";

const DebtSummaryModal = ({
  modalToggle,
  handleClose,
  title,
  totalDebt,
  totalPaid,
}) => {
  return (
    <Modal isOpen={modalToggle} toggle={handleClose}>
      <ModalHeader toggle={handleClose} />
      <ModalBody>
        <h3 className="text-center">{title}</h3>
        <Row>
          <Col md={12}>
            <h5 className="text-dark">
              <Table borderless>
                <tbody>
                  <tr>
                    <td>Total Summary</td>
                    <td>:</td>
                    <td>Rp. {numberWithCommas(totalDebt)}</td>
                  </tr>
                  <tr>
                    <td>Total Paid</td>
                    <td>:</td>
                    <td>Rp. {numberWithCommas(totalPaid)}</td>
                  </tr>
                  <tr>
                    <td>Total Unpaid</td>
                    <td>:</td>
                    <td>Rp. {numberWithCommas(totalDebt - totalPaid)}</td>
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

export default DebtSummaryModal;
