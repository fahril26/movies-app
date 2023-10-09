import { useState } from "react";
import useFetch from "../../hook/useFetch";
import LayoutListMovies from "../../components/LayoutListMovies";

const TopRatedList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useFetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}`
  );

  const titlePage = "Top Rated Movies";
  const secondTitlePage = "Online Streaming";
  const type = "movie";

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

export default TopRatedList;
