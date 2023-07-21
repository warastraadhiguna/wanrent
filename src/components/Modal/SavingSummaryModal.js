import React from "react";
import { Col, Modal, ModalBody, ModalHeader, Row, Table } from "reactstrap";
import { numberWithCommas } from "utils";

const SavingSummaryModal = ({
  modalToggle,
  handleClose,
  title,
  totalSaving,
  totalTaken,
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
                    <td>Rp. {numberWithCommas(totalSaving)}</td>
                  </tr>
                  <tr>
                    <td>Total Taken</td>
                    <td>:</td>
                    <td>Rp. {numberWithCommas(totalTaken)}</td>
                  </tr>
                  <tr>
                    <td>Total Untaken</td>
                    <td>:</td>
                    <td>Rp. {numberWithCommas(totalSaving - totalTaken)}</td>
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

export default SavingSummaryModal;
