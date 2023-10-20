/* eslint-disable react/prop-types */
import { useContext } from "react";
import MyCard from "./MyCard";
import MyPagination from "./MyPagination";
import { TrailerContext } from "../context/ModaltrailerContext";
import ModalWatchNow from "../components/ModalWatchNow";
import { useEffect } from "react";
import { useState } from "react";

const ListMoviesComponent = ({
  fetchData,
  type,
  loading,
  currentPage,
  setCurrentPage,
}) => {
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);
  const { modalShow, handleShowModal, setModalShow } =
    useContext(TrailerContext);

  useEffect(() => {
    const paginationNumberFixed = JSON.parse(
      localStorage.getItem("paginationNumbers")
    );

    setPageNumbers(paginationNumberFixed);
  }, [pageNumbers[0], currentPage]);

  return (
    <>
      <MyPagination
        totalPage={fetchData?.data?.total_pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        loading={loading}
        pageNumbers={pageNumbers}
        setPageNumbers={setPageNumbers}
      />

      <div className="row row-cols-lg-5 row-cols-md-3 row-cols-2 cards-wrapper">
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
              voteAverage={data.vote_average}
              id={data.id}
              type={type}
              handleShowModal={handleShowModal}
            />
          </div>
        ))}
      </div>

      <MyPagination
        totalPage={fetchData?.data?.total_pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageNumbers={pageNumbers}
        setPageNumbers={setPageNumbers}
      />

      <ModalWatchNow show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default ListMoviesComponent;
