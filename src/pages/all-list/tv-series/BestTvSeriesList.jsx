import useFetch from "../../../hook/useFetch";
import LayoutListMovies from "../../../components/LayoutListMovies";
import { CurrentPage } from "../../../context/CurrentPageContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const BestTvSeriesList = () => {
  const { currentPage, setCurrentPage } = useContext(CurrentPage);
  const getCurrentPageFromUrl = location.pathname.split("/");
  const currentPageFromUrl =
    getCurrentPageFromUrl[getCurrentPageFromUrl.length - 1];

  const navigate = useNavigate();
  const fetchData = useFetch(
    `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${currentPageFromUrl}`
  );

  const titlePage = "Top Rated TV Series";
  const secondTitlePage = "ONLINE STREAMING";
  const type = "tv";

  useEffect(() => {
    navigate(`/tv/best-tv-series/${currentPage}`);
    localStorage.setItem("currentPage", currentPage);
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

export default BestTvSeriesList;
