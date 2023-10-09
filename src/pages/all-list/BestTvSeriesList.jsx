import { useState } from "react";
import useFetch from "../../hook/useFetch";
import LayoutListMovies from "../../components/LayoutListMovies";

const BestTvSeriesList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useFetch(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${currentPage}`
  );

  const titlePage = "Top Rated TV Series";
  const secondTitlePage = "ONLINE STREAMING";
  const type = "tv";

  return (
    <LayoutListMovies
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      fetchData={fetchData}
      titlePage={titlePage}
      secondTitlePage={secondTitlePage}
      type={type}
    />
  );
};

export default BestTvSeriesList;
