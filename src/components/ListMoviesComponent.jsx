/* eslint-disable react/prop-types */
import MyCard from "./MyCard";
import MyPagination from "./MyPagination";

const ListMoviesComponent = ({
  fetchData,
  currentPage,
  setCurrentPage,
  type,
  loading,
}) => {
  return (
    <>
      <>
        <MyPagination
          totalPage={fetchData?.data?.total_pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          loading={loading}
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
              />
            </div>
          ))}
        </div>

        <MyPagination
          totalPage={fetchData?.data?.total_pages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </>
    </>
  );
};

export default ListMoviesComponent;
