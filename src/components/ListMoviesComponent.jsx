/* eslint-disable react/prop-types */

import { useEffect } from "react";
import MyCard from "./MyCard";
import MyPagination from "./MyPagination";
import { Link } from "react-router-dom";
import { useState } from "react";

const ListMoviesComponent = ({
  fetchData,
  type,
  loading,
  currentPage,
  setCurrentPage,
  pageNumbers,
  setPageNumbers,
}) => {
  const totalPage = fetchData?.data?.total_pages;
  const [listPageNumbers, setListPageNumbers] = useState([]);

  const deleteTheFirstArray = (list) => {
    if (list.length > 3) {
      list.shift();
    }
  };

  useEffect(() => {
    const list = listPageNumbers.slice();
    list.push(pageNumbers);
    deleteTheFirstArray(list);
    setListPageNumbers(list);
  }, [pageNumbers]);

  return (
    <div
      className="list"
      style={fetchData?.data?.results?.length < 3 ? { height: "73vh" } : {}}
    >
      {fetchData?.data?.results?.length > 0 ? (
        <MyPagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loading}
          pageNumbers={pageNumbers}
          setPageNumbers={setPageNumbers}
        />
      ) : null}

      {fetchData?.data?.results?.length > 0 ? (
        <div className="row row-cols-lg-5 row-cols-md-3 row-cols-2 cards-wrapper ">
          {fetchData?.data?.results.map((data) => (
            <div
              className={`col p-0 d-flex justify-content-center  mt-4`}
              key={data.id}
            >
              <MyCard
                title={data.title ? data.title : data.name}
                poster={data.poster_path}
                releaseDate={
                  type === "tv" ? data.first_air_date : data.release_date
                }
                voteAverage={data?.vote_average}
                id={data.id}
                type={type}
              />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ height: "100vh", textAlign: "center" }}>
          <h1 style={{ color: "#fff", marginTop: "100px" }}>
            No Have Data Film
          </h1>
          <Link
            to={-1}
            onClick={() => {
              setPageNumbers(listPageNumbers[listPageNumbers.length - 2]);
              localStorage.setItem(
                "paginationNumbers",
                JSON.stringify(listPageNumbers[listPageNumbers.length - 2])
              );
            }}
          >
            Back to previous page
          </Link>
        </div>
      )}

      {fetchData?.data?.results?.length > 4 && (
        <MyPagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loading}
          pageNumbers={pageNumbers}
          setPageNumbers={setPageNumbers}
        />
      )}
    </div>
  );
};

export default ListMoviesComponent;
