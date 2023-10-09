import { useEffect } from "react";
import LayoutMovieDetail from "../../components/LayoutMovieDetail";

const MovieDetail = () => {
  useEffect(() => {
    localStorage.setItem("type", "movie");
  }, []);

  return <LayoutMovieDetail />;
};

export default MovieDetail;
