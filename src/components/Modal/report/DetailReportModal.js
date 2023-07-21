import React from "react";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { numberWithCommas } from "utils";

const DetailReportModal = ({
  modalToggle,
  handleClose,
  choosenDetailReport,
  detailTotalPaymentSummary,
  detailTotalTotalCostSummary,
  detailTotalNettoSummary,
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
        <h3 className="text-center">Detail Report</h3>
        <Table bordered striped responsive>
          <thead className="text-primary">
            <tr>
              <th width="5%">No</th>
              <th>Vehicle</th>
              <th width="20%">Total Payment</th>
              <th width="20%">Total Cost</th>
              <th width="20%">Net</th>
            </tr>
          </thead>
          <tbody>
            {choosenDetailReport ? (
              choosenDetailReport.map((report, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {report.code} - {report.licence_plate}
                  </td>
                  <td>{numberWithCommas(report.total_payment_rent)}</td>
                  <td>{numberWithCommas(report.total_cost)}</td>
                  <td>{numberWithCommas(report.netto)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} align="center">
                  Data Kosong
                </td>
              </tr>
            )}
            <tr className="font-weight-bold">
              <td colSpan={2} className="text-center">
                TOTAL
              </td>
              <td>Rp. {numberWithCommas(detailTotalPaymentSummary)}</td>
              <td>Rp. {numberWithCommas(detailTotalTotalCostSummary)}</td>
              <td>Rp. {numberWithCommas(detailTotalNettoSummary)}</td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default DetailReportModal;
