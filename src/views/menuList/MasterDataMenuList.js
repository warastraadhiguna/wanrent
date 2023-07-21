import React, { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";

export default function MasterDataMenuList() {
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
        size="md"
        isOpen={modalToggle}
        toggle={handleClose}
      >
        <ModalHeader toggle={handleClose} />
        <ModalBody className="text-center">
          <h3>Master Data Menu List</h3>
          <Table>
            <thead className="text-primary">
              <tr>
                <th>
                  <Link to="/admin/brands" className="btn btn-success">
                    Brands
                  </Link>
                </th>
              </tr>
              <tr>
                <th>
                  <Link to="/admin/prices" className="btn btn-primary">
                    Prices
                  </Link>
                </th>
              </tr>
              <tr>
                <th>
                  <Link to="/admin/users" className="btn btn-info">
                    Master Users
                  </Link>
                </th>
              </tr>
              <tr>
                <th>
                  <Link to="/admin/suppliers" className="btn btn-warning">
                    Master Suppliers
                  </Link>
                </th>
              </tr>
              <tr>
                <th>
                  <Link to="/admin/vehicles" className="btn btn-danger">
                    Master Vehicles
                  </Link>
                </th>
              </tr>
              <tr>
                <th>
                  <Link to="/admin/ownerships" className="btn btn-secondary">
                    Master Ownerships
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
