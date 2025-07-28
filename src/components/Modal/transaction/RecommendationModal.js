import { getOwnershipTargetValues } from "actions/ownership/OwnershipAction";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Col,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
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
  const [status, setStatus] = useState(0);
  const filteredData =
    getOwnershipTargetValuesResult.data?.filter(
      (report) => status === "" || report.is_rented === Number(status)
    ) || [];

  const totalAchieved = filteredData.reduce(
    (sum, report) => sum + Number(report.achieved_target),
    0
  );

  const averageAchieved =
    filteredData.length > 0 ? totalAchieved / filteredData.length : 0;

  useEffect(() => {
    dispatch(getOwnershipTargetValues(accessToken));
  }, [accessToken, dispatch]);

  return (
    <Modal autoFocus={false} size="l" isOpen={modalToggle} toggle={handleClose}>
      <ModalHeader toggle={handleClose} />
      <ModalBody className="text-center">
        <h3>{title}</h3>
        <Row className="mb-3">
          <Col md={3} className="d-flex align-items-center">
            <label>
              <b>Status Filter</b>
            </label>
          </Col>
          <Col md={9}>
            <FormGroup>
              <Input
                type="select"
                name="id_supplier"
                onChange={(event) => setStatus(event.target.value)}
                value={status}>
                <option value="0">Available</option>
                <option value="1">Rented</option>
                <option value="">All</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>

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
              getOwnershipTargetValuesResult.data
                .filter((report) =>
                  status === "" || report.is_rented === Number(status)
                    ? true
                    : false
                )
                .map((report, index) => (
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

        <p>Rata-rata: {numberWithCommas(averageAchieved.toFixed(0))}</p>
      </ModalBody>
    </Modal>
  );
};

export default RecommendationModal;
