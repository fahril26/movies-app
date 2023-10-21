import useFetch from "../../../hook/useFetch";
import LayoutListMovies from "../../../components/LayoutListMovies";
import { CurrentPage } from "../../../context/CurrentPageContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PopularMovieList = () => {
  const { currentPage, setCurrentPage } = useContext(CurrentPage);

  const navigate = useNavigate();

  const fetchData = useFetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`
  );
  const titlePage = "Popular Movies";
  const secondTitlePage = "Online Streaming";
  const type = "movie";

  useEffect(() => {
    navigate(`/movies/popular/${currentPage}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

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

export default PopularMovieList;