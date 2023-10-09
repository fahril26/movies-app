/* eslint-disable react/prop-types */
import { Pagination } from "react-bootstrap";
import { MyPaginationContext } from "../context/PaginationContext";
import "../style/MyPagination.css";
import { useContext } from "react";

const MyPagination = ({ totalPage, currentPage, setCurrentPage }) => {
  const { pageNumbers, setPageNumbers } = useContext(MyPaginationContext);

  const changeNumber = (index) => {
    let newNumbers = null;
    const currentNumber = pageNumbers.slice();

    if (index < 2 && currentNumber[0] !== 1) {
      if (currentPage > 4) newNumbers = decrementNumber(index, currentNumber);
      else newNumbers = [1, 2, 3, 4, 5];
    } else if (
      index > 2 &&
      currentNumber[currentNumber.length - 1] !== totalPage
    ) {
      if (currentPage <= totalPage - 4)
        newNumbers = incrementNumber(index, currentNumber);
      else
        newNumbers = [
          totalPage - 4,
          totalPage - 3,
          totalPage - 2,
          totalPage - 1,
          totalPage,
        ];
    }

    if (newNumbers && currentPage > 3) setPageNumbers(newNumbers);
  };

  const incrementNumber = (indexNumber, currentNumber) => {
    const newNumber = [];

    for (const index in currentNumber) {
      if (indexNumber === 3) {
        currentNumber[index] += 1;
      } else {
        currentNumber[index] += 2;
      }

      newNumber.push(currentNumber[index]);
    }

    return newNumber;
  };

  const decrementNumber = (indexNumber, currentNumber) => {
    const newNumber = [];

    for (const index in currentNumber) {
      if (indexNumber === 0) {
        currentNumber[index] -= 2;
      } else {
        currentNumber[index] -= 1;
      }

      newNumber.push(currentNumber[index]);
    }

    return newNumber;
  };

  const handleClick = (number, index) => {
    setCurrentPage(number);
    changeNumber(index);
  };

  const firstPage = () => {
    const currentNumber = pageNumbers.slice();
    const newNumber = [];
    for (const index in currentNumber) {
      currentNumber[index] = Number(index) + 1;
      newNumber.push(currentNumber[index]);
    }

    setCurrentPage(1);
    setPageNumbers(newNumber);
  };

  const lastPage = () => {
    const currentNumber = pageNumbers.slice();
    const newNumber = [];
    for (const index in currentNumber) {
      currentNumber[index] = totalPage - index;
      newNumber.push(currentNumber[index]);
    }

    newNumber.reverse();

    setCurrentPage(totalPage);
    setPageNumbers(newNumber);
  };

  const handlePrev = (currentPage) => {
    setCurrentPage(currentPage - 1);

    if (currentPage <= totalPage - 4) changeNumber(1);
  };

  const handleNext = (currentPage) => {
    setCurrentPage(currentPage + 1);

    changeNumber(3);
  };

  return (
    <Pagination className="my-pagination d-flex justify-content-center gap-2">
      {currentPage > 4 && (
        <Pagination.Item onClick={firstPage}>{1}</Pagination.Item>
      )}
      {currentPage > 1 && (
        <Pagination.Prev onClick={() => handlePrev(currentPage)} />
      )}
      {pageNumbers.map((items, index) => (
        <Pagination.Item
          key={items}
          onClick={() => handleClick(items, index)}
          active={currentPage === items}
        >
          {items}
        </Pagination.Item>
      ))}

      {currentPage <= totalPage - 1 && (
        <Pagination.Next onClick={() => handleNext(currentPage)} />
      )}
      {currentPage <= totalPage - 5 && (
        <Pagination.Item onClick={lastPage}>{totalPage}</Pagination.Item>
      )}
    </Pagination>
  );
};

export default MyPagination;
