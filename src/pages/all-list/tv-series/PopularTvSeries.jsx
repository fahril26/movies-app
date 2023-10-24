import { useContext } from "react";
import { CurrentPage } from "../../../context/CurrentPageContext";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hook/useFetch";
import { useEffect } from "react";
import LayoutListMovies from "../../../components/LayoutListMovies";

const PopularTvSeries = () => {
  const { currentPage, setCurrentPage } = useContext(CurrentPage);

  const navigate = useNavigate();

  const fetchData = useFetch(
    `https://api.themoviedb.org/3/tv/popular?language=en-US&page=${currentPage}`
  );
  const titlePage = "Popular Tv Series";
  const secondTitlePage = "Online Streaming";
  const type = "tv";

  useEffect(() => {
    navigate(`/tv/popular/${currentPage}`);

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

export default PopularTvSeries;
