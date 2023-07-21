import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";

export default function CostMenuList() {
  const [modalToggle, setModalToggle] = useState(true);
  const history = useHistory();

  const handleClose = () => {
    setModalToggle(false);
    history.push("/dashboard");
  };

  return (
    <div className="content">
      <Modal
        autoFocus={false}
        size="sm"
        isOpen={modalToggle}
        toggle={handleClose}
      >
        <ModalHeader toggle={handleClose} />
        <ModalBody className="text-center">
          <h3>Cost Menu List</h3>
          <Table>
            <thead className="text-primary">
              <tr>
                <th>
                  <Link to="/admin/company-cost" className="btn btn-secondary">
                    Company Cost
                  </Link>
                </th>
              </tr>
              <tr>
                <th>
                  <Link to="/admin/personal-cost" className="btn btn-success">
                    Personal Cost
                  </Link>
                </th>
              </tr>
              <tr>
                <th>
                  <Link to="/admin/cost" className="btn btn-primary">
                    Cost
                  </Link>
                </th>
              </tr>
            </thead>
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}
