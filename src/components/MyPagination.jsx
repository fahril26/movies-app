/* eslint-disable react/prop-types */
import { Pagination } from "react-bootstrap";
import "../style/MyPagination.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const MyPagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
  loading,
  pageNumbers,
  setPageNumbers,
}) => {
  const [pathName, setPathName] = useState("");
  const navigate = useNavigate();

  const getPageNumbers =
    totalPage <= 5
      ? Array.from({ length: totalPage }, (_, index) => index + 1)
      : pageNumbers;

  const changeNumber = (index, number) => {
    let newNumbers = null;
    const currentNumber = pageNumbers.slice();

    if (index < 2 && currentNumber[0] !== 1) {
      if (currentPage >= 2 || currentPage <= totalPage - 4) {
        newNumbers = decrementNumber(index, currentNumber);
        localStorage.setItem("paginationNumbers", JSON.stringify(newNumbers));
        setPageNumbers(newNumbers);
      }
    } else if (
      index > 2 &&
      currentNumber[currentNumber.length - 1] !== totalPage
    ) {
      1;

      if (currentPage <= totalPage || number >= 3) {
        newNumbers = incrementNumber(index, currentNumber);
        localStorage.setItem("paginationNumbers", JSON.stringify(newNumbers));
        setPageNumbers(newNumbers);
      }
    }
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

    if (newNumber[4] > totalPage)
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

    if (newNumber[0] <= 0) newNumber = [1, 2, 3, 4, 5];

    return newNumber;
  };

  const handleClick = (number, index) => {
    if (!loading) {
      setCurrentPage(number);
      navigate(`${pathName}/${number}`);

      number !== currentPage && changeNumber(index, number);
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

      localStorage.setItem("paginationNumbers", JSON.stringify(newNumber));
      setCurrentPage(1);
      setPageNumbers(newNumber);
      navigate(`${pathName}/1`);
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

      localStorage.setItem("paginationNumbers", JSON.stringify(newNumber));
      setCurrentPage(totalPage);
      setPageNumbers(newNumber);
      navigate(`${pathName}/${totalPage}`);
    }
  };

  const handlePrev = (currentPage) => {
    if (!loading) {
      setCurrentPage(currentPage - 1);
      navigate(`${pathName}/${currentPage - 1}`);

      if (currentPage <= totalPage - 4) changeNumber(1);
    }
  };

  const handleNext = (currentPage) => {
    if (!loading) {
      setCurrentPage(currentPage + 1);
      navigate(`${pathName}/${currentPage + 1}`);

      if (currentPage >= 5) {
        changeNumber(3);
      }
    }
  };

  useEffect(() => {
    const pathName = location.pathname.split("/").slice(0, 3).join("/");
    setPathName(pathName);
  }, []);

  return (
    <Pagination className="my-pagination d-flex justify-content-center gap-2">
      {pageNumbers[0] !== 1 && totalPage >= 5 && (
        <Pagination.Item
          onClick={firstPage}
          linkStyle={{ cursor: loading && "no-drop" }}
        >
          {1}
        </Pagination.Item>
      )}
      {currentPage > 1 && totalPage >= 5 && (
        <Pagination.Prev
          onClick={() => handlePrev(currentPage)}
          linkStyle={{ cursor: loading && "no-drop" }}
        />
      )}
      {getPageNumbers.map((items, index) => (
        <Pagination.Item
          key={items}
          onClick={() => handleClick(items, index)}
          active={currentPage === items}
          linkStyle={{ cursor: loading && "no-drop" }}
        >
          {items}
        </Pagination.Item>
      ))}

      {currentPage <= totalPage - 1 && totalPage >= 5 && (
        <Pagination.Next
          onClick={() => handleNext(currentPage)}
          linkStyle={{ cursor: loading && "no-drop" }}
        />
      )}
      {pageNumbers[4] !== totalPage && totalPage >= 5 && (
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
