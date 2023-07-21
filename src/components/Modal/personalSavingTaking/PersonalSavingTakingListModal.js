import moment from "moment";
import React from "react";
import { Button, Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { numberWithCommas } from "utils";

const PersonalSavingTakingListModal = ({
  modalToggle,
  handleClose,
  addModalToggle,
  choosenPersonalSaving,
  totalTakingByName,
  handleDeleteTakingData,
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
        <h3 className="text-center">Taking List</h3>
        <Button
          className="btn btn-success float-right"
          onClick={addModalToggle}
        >
          Add Taking
        </Button>
        <Table bordered striped responsive>
          <thead className="text-primary">
            <tr>
              <th width="5%">No</th>
              <th>Taking Date</th>
              <th>Total Taking</th>
              <th width="15%">Action</th>
            </tr>
          </thead>
          <tbody>
            {choosenPersonalSaving ? (
              choosenPersonalSaving[0].personal_saving_takings.map(
                (personalSaving, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      {moment(personalSaving.createdAt).format(
                        "dddd, DD MMMM YYYY HH:mm:ss"
                      )}
                    </td>
                    <td>{numberWithCommas(personalSaving.total)}</td>
                    <td>
                      <Button
                        color="danger"
                        className="mr-2 mb-2"
                        onClick={() =>
                          handleDeleteTakingData(personalSaving.id)
                        }
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
              <td colSpan={2}>Rp. {numberWithCommas(totalTakingByName)}</td>
            </tr>
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default PersonalSavingTakingListModal;
