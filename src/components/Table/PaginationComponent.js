/* eslint-disable array-callback-return */
import React from "react";
import { Pagination, PaginationItem, PaginationLink } from "reactstrap";

function PaginationComponent({
  currentPage,
  pagesCount,
  totalData,
  pageSize,
  handleClick,
}) {
  const limitShow = 3;
  const limitShowAll = 7;

  return (
    <>
      <div className="float-left">{`Number ${
        totalData === 0 ? 0 : currentPage * pageSize + 1
      } - ${
        currentPage * pageSize + pageSize >= totalData
          ? totalData
          : currentPage * pageSize + pageSize
      }  From Total ${totalData} Data`}</div>
      <div className="pagination-wrapper float-right">
        <Pagination aria-label="Page navigation example">
          <PaginationItem disabled={currentPage <= 0}>
            <PaginationLink
              onClick={(e) => handleClick(e, currentPage - 1)}
              previous
              href="#"
            />
          </PaginationItem>

          <PaginationItem hidden={currentPage === 0}>
            <PaginationLink onClick={(e) => handleClick(e, 0)} href="#">
              First
            </PaginationLink>
          </PaginationItem>

          {[...Array(pagesCount)].map((page, i) => {
            if (pagesCount < limitShowAll) {
              return (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            //posisi tengah
            if (currentPage === i) {
              return (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            }

            // kiri
            if (i >= currentPage - limitShow && i < currentPage) {
              return (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            //titik kiri
            if (i === currentPage - (limitShow + 1) && i < currentPage) {
              return (
                <PaginationItem disabled key={i}>
                  <PaginationLink href="#">...</PaginationLink>
                </PaginationItem>
              );
            }

            // kanan
            if (i <= currentPage + limitShow && i > currentPage) {
              return (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            //titik kanan
            if (i === currentPage + (limitShow + 1) && i > currentPage) {
              return (
                <PaginationItem disabled key={i}>
                  <PaginationLink href="#">...</PaginationLink>
                </PaginationItem>
              );
            }

            // return (
            //   <PaginationItem active={i === currentPage} key={i}>
            //     <PaginationLink onClick={(e) => handleClick(e, i)} href="#">
            //       {i + 1}
            //     </PaginationLink>
            //   </PaginationItem>
            // );
          })}

          <PaginationItem hidden={currentPage === pagesCount - 1}>
            <PaginationLink
              onClick={(e) => handleClick(e, pagesCount - 1)}
              href="#"
            >
              Last
            </PaginationLink>
          </PaginationItem>

          <PaginationItem disabled={currentPage >= pagesCount - 1}>
            <PaginationLink
              onClick={(e) => handleClick(e, currentPage + 1)}
              next
              href="#"
            />
          </PaginationItem>
        </Pagination>
      </div>
    </>
  );
}

export default PaginationComponent;
