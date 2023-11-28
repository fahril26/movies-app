/* eslint-disable react/prop-types */
import MyCard from "./MyCard";
import MyPagination from "./MyPagination";
import { useLocation } from "react-router-dom";

const ListMoviesComponent = ({
  fetchData,
  type,
  loading,
  currentPage,
  setCurrentPage,
  pageNumbers,
  setPageNumbers,
}) => {
  const { pathname } = useLocation();

  const getTotalPage = () => {
    let total = null;
    const pageName = pathname.split("/")[2];

    if (pageName === "airing-today") total = 16;
    else if (pageName === "on-the-air") total = 64;
    else total = fetchData?.data?.total_pages;

    return total;
  };

  const totalPage = getTotalPage();

  return (
    <div
      className="list"
      style={fetchData?.data?.results?.length < 3 ? { height: "73vh" } : {}}
    >
      {fetchData?.data?.results && (
        <MyPagination
          totalPage={totalPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loading}
          pageNumbers={pageNumbers}
          setPageNumbers={setPageNumbers}
        />
      )}

      {fetchData?.data?.results ? (
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
              />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ height: "100vh" }}>No Data</div>
      )}

      {fetchData?.data?.results && (
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
