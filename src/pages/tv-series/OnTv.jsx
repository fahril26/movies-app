import { useContext } from "react";
import { CurrentPage } from "../../context/CurrentPageContext";
import useFetch from "../../hook/useFetch";
import LayoutListMovies from "../../components/LayoutListMovies";

export default function OnTv() {
  const { currentPage, setCurrentPage } = useContext(CurrentPage);

  const fetchData = useFetch(
    `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${currentPage}`
  );
  const titlePage = "Currently Airing TV Shows";
  const secondTitlePage = "Online Streaming";
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
}
