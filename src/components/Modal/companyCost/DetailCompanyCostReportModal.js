import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader, Spinner, Table } from "reactstrap";
import { numberWithCommas } from "utils";

const DetailCompanyCostReportModal = ({ modalToggle, handleClose }) => {
  const { getCompanyCostResult, getCompanyCostLoading } = useSelector(
    (state) => state.CompanyCostReducer
  );

  return (
    <Modal
      autoFocus={false}
      size="lg"
      isOpen={modalToggle}
      toggle={handleClose}
    >
      <ModalHeader toggle={handleClose} />
      <ModalBody>
        <h3 className="text-center">Detail Company Cost Report</h3>
        <Table bordered responsive>
          <thead className="text-primary">
            <tr>
              <th width="5%">No</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            {getCompanyCostResult && getCompanyCostResult.data.length > 0 ? (
              getCompanyCostResult.data.map((companyCost, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <Table borderless>
                      <tbody>
                        <tr>
                          <td>Date</td>
                          <td>:</td>
                          <td>
                            {moment(companyCost.company_cost_date).format(
                              "dddd, DD MMMM YYYY"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td>Note</td>
                          <td>:</td>
                          <td>{companyCost.note && companyCost.note}</td>
                        </tr>
                        <tr>
                          <td>Total</td>
                          <td>:</td>
                          <td>Rp. {numberWithCommas(companyCost.total)}</td>
                        </tr>
                        <tr>
                          <td>User</td>
                          <td>:</td>
                          <td>{companyCost.user.name}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </td>
                </tr>
              ))
            ) : getCompanyCostLoading ? (
              <tr>
                <td colSpan={5} align="center">
                  <Spinner color="primary" />
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan={5} align="center">
                  Data is not available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default DetailCompanyCostReportModal;
