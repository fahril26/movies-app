/* eslint-disable react/prop-types */
import { Pagination } from "react-bootstrap";
import { MyPaginationContext } from "../context/PaginationContext";
import "../style/MyPagination.css";
import { useContext } from "react";

const MyPagination = ({ totalPage, currentPage, setCurrentPage, loading }) => {
  const { pageNumbers, setPageNumbers } = useContext(MyPaginationContext);

  const changeNumber = (index) => {
    let newNumbers = null;
    const currentNumber = pageNumbers.slice();

    if (index <= 2 && currentNumber[0] !== 1) {
      if (currentPage > 3) newNumbers = decrementNumber(index, currentNumber);
    } else if (
      index > 2 &&
      currentNumber[currentNumber.length - 1] !== totalPage
    ) {
      if (currentPage <= totalPage - 3)
        newNumbers = incrementNumber(index, currentNumber);
    }

    if (newNumbers && currentPage > 3) setPageNumbers(newNumbers);
  };

  const incrementNumber = (indexNumber, currentNumber) => {
    let newNumber = [];

    for (const index in currentNumber) {
      if (indexNumber === 3) {
        currentNumber[index] += 1;
      } else {
        currentNumber[index] += 2;
      }

      newNumber.push(currentNumber[index]);
    }

    if (newNumber[4] === totalPage + 1)
      newNumber = [
        totalPage - 4,
        totalPage - 3,
        totalPage - 2,
        totalPage - 1,
        totalPage,
      ];

    return newNumber;
  };

  const decrementNumber = (indexNumber, currentNumber) => {
    let newNumber = [];

    if (currentPage >= 2) {
      for (const index in currentNumber) {
        if (indexNumber === 0) {
          currentNumber[index] -= 2;
        } else {
          currentNumber[index] -= 1;
        }

        newNumber.push(currentNumber[index]);
      }
    }

    if (newNumber[0] === 0) newNumber = [1, 2, 3, 4, 5];

    return newNumber;
  };

  const handleClick = (number, index) => {
    if (!loading) {
      setCurrentPage(number);
      changeNumber(index);
    }
  };

  const firstPage = () => {
    if (!loading) {
      const currentNumber = pageNumbers.slice();
      const newNumber = [];
      for (const index in currentNumber) {
        currentNumber[index] = Number(index) + 1;
        newNumber.push(currentNumber[index]);
      }

      setCurrentPage(1);
      setPageNumbers(newNumber);
    }
  };

  const lastPage = () => {
    if (!loading) {
      const currentNumber = pageNumbers.slice();
      const newNumber = [];
      for (const index in currentNumber) {
        currentNumber[index] = totalPage - index;
        newNumber.push(currentNumber[index]);
      }

      newNumber.reverse();

      setCurrentPage(totalPage);
      setPageNumbers(newNumber);
    }
  };

  const handlePrev = (currentPage) => {
    if (!loading) {
      setCurrentPage(currentPage - 1);

      if (currentPage <= totalPage - 4) changeNumber(1);
    }
  };

  const handleNext = (currentPage) => {
    if (!loading) {
      setCurrentPage(currentPage + 1);

      changeNumber(3);
    }
  };

  return (
    <Pagination className="my-pagination d-flex justify-content-center gap-2">
      {currentPage > 5 && (
        <Pagination.Item
          onClick={firstPage}
          linkStyle={{ cursor: loading && "no-drop" }}
        >
          {1}
        </Pagination.Item>
      )}
      {currentPage > 1 && (
        <Pagination.Prev
          onClick={() => handlePrev(currentPage)}
          linkStyle={{ cursor: loading && "no-drop" }}
        />
      )}
      {pageNumbers.map((items, index) => (
        <Pagination.Item
          key={items}
          onClick={() => handleClick(items, index)}
          active={currentPage === items}
          linkStyle={{ cursor: loading && "no-drop" }}
        >
          {items}
        </Pagination.Item>
      ))}

      {currentPage <= totalPage - 1 && (
        <Pagination.Next
          onClick={() => handleNext(currentPage)}
          linkStyle={{ cursor: loading && "no-drop" }}
        />
      )}
      {currentPage <= totalPage - 5 && (
        <Pagination.Item
          onClick={lastPage}
          linkStyle={{ cursor: loading && "no-drop" }}
        >
          {totalPage}
        </Pagination.Item>
      )}
    </Pagination>
  );
};

export default MyPagination;
