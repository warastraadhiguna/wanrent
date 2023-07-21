import React from "react";
import { Col, Modal, ModalBody, ModalHeader, Row, Table } from "reactstrap";
import { numberWithCommas } from "utils";

const CostSummaryModal = ({ modalToggle, handleClose, title, totalCost }) => {
  return (
    <Modal isOpen={modalToggle} toggle={handleClose}>
      <ModalHeader toggle={handleClose} />
      <ModalBody className="text-center">
        <h3>{title}</h3>
        <Row>
          <Col md={12}>
            <h5 className="text-center text-dark">
              <Table borderless>
                <tbody>
                  <tr>
                    <td>Total Summary</td>
                    <td>:</td>
                    <td>Rp. {numberWithCommas(totalCost)}</td>
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

export default CostSummaryModal;
