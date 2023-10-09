/* eslint-disable react/prop-types */
import MyCard from "./MyCard";
import MyPagination from "./MyPagination";
import PlaceholderCard from "./PlaceholderCard";

const ListMoviesComponent = ({
  fetchData,
  currentPage,
  setCurrentPage,
  type,
}) => {
  const loading = fetchData.loading;
  return (
    <>
      <MyPagination
        totalPage={fetchData?.data?.total_pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="row row-cols-lg-5 row-cols-md-3 row-cols-2 cards-wrapper mt-5">
        {fetchData?.data?.results.map((data) => (
          <div className="col p-0 d-flex justify-content-center" key={data.id}>
            {loading ? (
              <PlaceholderCard />
            ) : (
              <MyCard
                title={data.title ? data.title : data.name}
                poster={data.poster_path}
                releaseDate={data.release_date}
                voteAverage={data.vote_average}
                id={data.id}
                type={type}
              />
            )}
          </div>
        ))}
      </div>

      <MyPagination
        totalPage={fetchData?.data?.total_pages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default ListMoviesComponent;
