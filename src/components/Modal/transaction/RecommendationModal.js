import { getOwnershipTargetValues } from "actions/ownership/OwnershipAction";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import { numberWithCommas } from "utils";

const RecommendationModal = ({
  title,
  modalToggle,
  handleClose,
  accessToken,
}) => {
  const dispatch = useDispatch();
  const { getOwnershipTargetValuesResult } = useSelector(
    (state) => state.OwnershipReducer
  );

  useEffect(() => {
    dispatch(getOwnershipTargetValues(accessToken));
  }, [accessToken, dispatch]);

  return (
    <Modal autoFocus={false} size="l" isOpen={modalToggle} toggle={handleClose}>
      <ModalHeader toggle={handleClose} />
      <ModalBody className="text-center">
        <h3>{title}</h3>
        <Table bordered striped responsive>
          <thead className="text-primary">
            <tr>
              <th width="5%">No</th>
              <th>Vehicle</th>
              <th>Target Value</th>
            </tr>
          </thead>
          <tbody>
            {getOwnershipTargetValuesResult ? (
              getOwnershipTargetValuesResult.data.map((report, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {report.code} - {report.licence_plate}
                  </td>
                  <td>{numberWithCommas(report.achieved_target)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} align="center">
                  Data Kosong
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ModalBody>
    </Modal>
  );
};

export default RecommendationModal;
