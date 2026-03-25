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
  const [sortConfig, setSortConfig] = useState({
    key: "actual_value",
    direction: "asc",
  });

  const handleSort = (key) => {
    setSortConfig((prevSortConfig) => ({
      key,
      direction:
        prevSortConfig.key === key && prevSortConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key) {
      return "";
    }

    return sortConfig.direction === "asc" ? " (asc)" : " (desc)";
  };

  const filteredData =
    getOwnershipTargetValuesResult.data?.filter(
      (report) => status === "" || report.is_rented === Number(status)
    )
      .sort((a, b) => {
        const sortValue =
          Number(a[sortConfig.key]) - Number(b[sortConfig.key]);

        return sortConfig.direction === "asc" ? sortValue : -sortValue;
      }) || [];

  const totalActualValue = filteredData.reduce(
    (sum, report) => sum + Number(report.actual_value),
    0
  );
  const totalExpectedValue = filteredData.reduce(
    (sum, report) => sum + Number(report.expected_value),
    0
  );

  const actualAverage =
    filteredData.length > 0 ? totalActualValue / filteredData.length : 0;
  const expectedAverage =
    filteredData.length > 0 ? totalExpectedValue / filteredData.length : 0;

  useEffect(() => {
    dispatch(getOwnershipTargetValues(accessToken));
  }, [accessToken, dispatch]);

  return (
    <Modal
      autoFocus={false}
      size="lg"
      isOpen={modalToggle}
      toggle={handleClose}>
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
              <th
                onClick={() => handleSort("actual_value")}
                style={{ cursor: "pointer" }}>
                Actual Value
                {getSortIndicator("actual_value")}
              </th>
              <th
                onClick={() => handleSort("expected_value")}
                style={{ cursor: "pointer" }}>
                Expected Value
                {getSortIndicator("expected_value")}
              </th>
            </tr>
          </thead>
          <tbody>
            {getOwnershipTargetValuesResult ? (
              filteredData.map((report, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    {report.code} - {report.licence_plate}
                  </td>
                  <td>{numberWithCommas(report.actual_value)}</td>
                  <td>{numberWithCommas(report.expected_value)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} align="center">
                  Data Kosong
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <p>
          Actual Average: {numberWithCommas(actualAverage.toFixed(1))}
          <br />
          Expected Average: {numberWithCommas(expectedAverage.toFixed(1))}
        </p>
      </ModalBody>
    </Modal>
  );
};

export default RecommendationModal;
