/* eslint-disable react-hooks/exhaustive-deps */
import useFetch from "../../hook/useFetch";
import LayoutListMovies from "../../components/LayoutListMovies";
import { useContext } from "react";
import { CurrentPage } from "../../context/CurrentPageContext";

export const UpcomingList = () => {
  const { currentPage, setCurrentPage } = useContext(CurrentPage);

  const fetchData = useFetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${currentPage}`
  );

  const titlePage = "Upcoming Movies";
  const secondTitlePage = "ONLINE STREAMING";
  const type = "movie";

  return (
    <>
      <LayoutListMovies
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        fetchData={fetchData}
        titlePage={titlePage}
        secondTitlePage={secondTitlePage}
        type={type}
      />
    </>
  );
};
