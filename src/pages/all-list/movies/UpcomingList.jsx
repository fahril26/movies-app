import useFetch from "../../../hook/useFetch";
import LayoutListMovies from "../../../components/LayoutListMovies";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentPage } from "../../../context/CurrentPageContext";

export const UpcomingList = () => {
  const { currentPage, setCurrentPage } = useContext(CurrentPage);

  const navigate = useNavigate();

  const fetchData = useFetch(
    `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${currentPage}`
  );

  const titlePage = "Upcoming Movies";
  const secondTitlePage = "ONLINE STREAMING";
  const type = "movie";

  useEffect(() => {
    navigate(`/movies/upcoming/${currentPage}`);
  }, [currentPage]);

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
