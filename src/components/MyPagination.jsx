/* eslint-disable react/prop-types */
import { Pagination } from "react-bootstrap";
import "../style/MyPagination.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const MyPagination = ({
  totalPage,
  currentPage,
  setCurrentPage,
  loading,
  pageNumbers,
  setPageNumbers,
  navigatePath,
}) => {
  const [pathName, setPathName] = useState("");

  const [fixedTotalPage, setFixedTotalPage] = useState(null);
  const navigate = useNavigate();
  const SearchUrlParamsPage = new URLSearchParams(location.search).get("page");
  const { page } = useParams();

  const usedParams = page ? page : SearchUrlParamsPage;

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
      currentNumber[currentNumber.length - 1] !== fixedTotalPage
    ) {
      if (currentPage <= fixedTotalPage || number >= 3) {
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

    if (newNumber[4] > fixedTotalPage)
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
    const pathname = navigatePath
      ? `${navigatePath}&page=${number}`
      : `${pathName}/${number}`;

    if (!loading) {
      setCurrentPage(number);
      navigate(pathname);

      number !== currentPage && changeNumber(index, number);
    }
  };

  const firstPage = () => {
    const pathname = navigatePath ? `${navigatePath}&page=1` : `${pathName}/1`;

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
      navigate(pathname);
    }
  };

  const lastPage = () => {
    const pathname = navigatePath
      ? `${navigatePath}&page=${totalPage}`
      : `${pathName}/${totalPage}`;

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
      navigate(pathname);
    }
  };

  const handlePrev = (currentPage) => {
    const pathname = navigatePath
      ? `${navigatePath}&page=${currentPage - 1}`
      : `${pathName}/${currentPage - 1}`;
    if (!loading) {
      setCurrentPage(currentPage - 1);
      navigate(pathname);

      if (currentPage <= totalPage - 4) changeNumber(1);
    }
  };

  const handleNext = (currentPage) => {
    const pathname = navigatePath
      ? `${navigatePath}&page=${currentPage + 1}`
      : `${pathName}/${currentPage + 1}`;

    if (!loading) {
      setCurrentPage(currentPage + 1);
      navigate(pathname);

      if (currentPage >= 5 || pageNumbers[4] !== fixedTotalPage) {
        changeNumber(3);
      }
    }
  };

  useEffect(() => {
    const pathName = location.pathname.split("/").slice(0, 3).join("/");
    setPathName(pathName);
    setFixedTotalPage(totalPage);
  }, []);

  return (
    <Pagination className="my-pagination d-flex justify-content-center gap-2">
      {pageNumbers[0] !== 1 && fixedTotalPage >= 5 && (
        <Pagination.Item
          onClick={firstPage}
          linkStyle={{ cursor: loading && "no-drop" }}
        >
          {1}
        </Pagination.Item>
      )}
      {currentPage > 1 && fixedTotalPage >= 5 && (
        <Pagination.Prev
          onClick={() => handlePrev(currentPage)}
          linkStyle={{ cursor: loading && "no-drop" }}
        />
      )}
      {getPageNumbers.map((items, index) => (
        <Pagination.Item
          key={items}
          onClick={() => handleClick(items, index)}
          active={usedParams == items}
          linkStyle={{ cursor: loading && "no-drop" }}
        >
          {items}
        </Pagination.Item>
      ))}

      {currentPage <= fixedTotalPage - 1 && fixedTotalPage >= 5 && (
        <Pagination.Next
          onClick={() => handleNext(currentPage)}
          linkStyle={{ cursor: loading && "no-drop" }}
        />
      )}
      {pageNumbers[4] !== fixedTotalPage && fixedTotalPage >= 5 && (
        <Pagination.Item
          onClick={lastPage}
          linkStyle={{ cursor: loading && "no-drop" }}
        >
          {fixedTotalPage}
        </Pagination.Item>
      )}
    </Pagination>
  );
};

export default MyPagination;
