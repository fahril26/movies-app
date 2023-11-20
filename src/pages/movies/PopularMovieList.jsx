import useFetch from "../../hook/useFetch";
import LayoutListMovies from "../../components/LayoutListMovies";
import { CurrentPage } from "../../context/CurrentPageContext";
import { useContext } from "react";

const PopularMovieList = () => {
  const { currentPage, setCurrentPage } = useContext(CurrentPage);

  const fetchData = useFetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${currentPage}`
  );
  const titlePage = "Popular Movies";
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

export default PopularMovieList;
