import useFetch from "../../../hook/useFetch";
import LayoutListMovies from "../../../components/LayoutListMovies";
import { useContext } from "react";
import { CurrentPage } from "../../../context/CurrentPageContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TopRatedList = () => {
  const { currentPage, setCurrentPage } = useContext(CurrentPage);

  const navigate = useNavigate();

  const fetchData = useFetch(
    `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}`
  );

  const titlePage = "Top Rated Movies";
  const secondTitlePage = "Online Streaming";
  const type = "movie";

  useEffect(() => {
    navigate(`/movies/top-rated/${currentPage}`);
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

export default TopRatedList;
