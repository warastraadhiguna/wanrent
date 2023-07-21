import { getCustomerList } from "actions/customer/CustomerAction";
import { PaginationComponent, SearchComponent } from "components/Table";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Spinner,
  Table,
} from "reactstrap";
import ImageModal from "../ImageModal";

const ChooseCustomerModal = ({
  modalToggle,
  handleClose,
  chooseCustomer,
  accessToken,
}) => {
  const { getCustomerResult, getCustomerLoading } = useSelector(
    (state) => state.CustomerReducer
  );
  const dispatch = useDispatch();
  const [modalImageToggle, setModalImageToggle] = useState(false);
  const [urlImageShow, setUrlImageShow] = useState("");
  const [keyword, setKeyword] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pagesCount, setPagesCount] = useState(0);
  const [totalData, setTotalData] = useState(0);
  const pageSize = 5;

  useEffect(() => {
    if (getCustomerResult) {
      setPagesCount(Math.ceil(getCustomerResult.data.length / pageSize));

      setTotalData(getCustomerResult.data.length);
    }
  }, [getCustomerResult, pageSize]);

  const keywordHandleSubmit = (event) => {
    event.preventDefault();
    setSearchedText(keyword);
    dispatch(getCustomerList(accessToken, keyword));
  };

  const handleClick = (e, index) => {
    e.preventDefault();
    setCurrentPage(index);
  };

  return (
    <>
      <Modal
        autoFocus={false}
        size="lg"
        isOpen={modalToggle}
        toggle={handleClose}
      >
        <ModalHeader toggle={handleClose} />
        <ModalBody className="text-center">
          <h3>Customer List</h3>
          <SearchComponent
            keyword={keyword}
            searchedText={searchedText}
            keywordHandleSubmit={keywordHandleSubmit}
            handleChange={(e) => setKeyword(e.target.value)}
          />
          <Table responsive>
            <thead className="text-primary">
              <tr>
                <th>No</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Image</th>
                <th width="20%">Action</th>
              </tr>
            </thead>
            <tbody>
              {getCustomerResult ? (
                getCustomerResult.data
                  .slice(currentPage * pageSize, (currentPage + 1) * pageSize)
                  .map((customer, index) => (
                    <tr key={index}>
                      <td>{currentPage * pageSize + index + 1}</td>
                      <td>{customer.name}</td>
                      <td>{customer.phone}</td>
                      <td>
                        <img
                          src={customer.url}
                          alt={customer.image}
                          width={100}
                          onClick={() => {
                            setModalImageToggle(true);
                            setUrlImageShow(customer.url);
                          }}
                        />
                      </td>
                      <td align="center">
                        <Button
                          color="warning"
                          className="ml-2"
                          onClick={() => {
                            chooseCustomer(
                              customer.id,
                              customer.name + " (" + customer.phone + ")"
                            );
                            handleClose();
                          }}
                        >
                          <i className="nc-icon nc-tap-01"></i> Choose
                        </Button>
                      </td>
                    </tr>
                  ))
              ) : getCustomerLoading ? (
                <tr>
                  <td colSpan={5} align="center">
                    <Spinner color="primary" />
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan={5} align="center">
                    There are no data..
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <br />
          <PaginationComponent
            currentPage={currentPage}
            pagesCount={pagesCount}
            totalData={totalData}
            pageSize={pageSize}
            handleClick={handleClick}
          />
        </ModalBody>
      </Modal>
      <ImageModal
        modalToggle={modalImageToggle}
        urlImageShow={urlImageShow}
        handleClose={() => setModalImageToggle(false)}
      />
    </>
  );
};

export default ChooseCustomerModal;
