import useFetch from "../../hook/useFetch";
import { useState } from "react";

import LayoutListMovies from "../../components/LayoutListMovies";

export const UpcomingList = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = useFetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${currentPage}`
  );

  const titlePage = "Upcoming Movies";
  const secondTitlePage = "ONLINE STREAMING";
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
