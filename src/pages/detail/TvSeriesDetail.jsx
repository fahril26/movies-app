import { useEffect } from "react";
import LayoutMovieDetail from "../../components/LayoutMovieDetail";

const TvSeriesDetail = () => {
  useEffect(() => {
    localStorage.setItem("type", "tv");
  }, []);

  return <LayoutMovieDetail />;
};

export default TvSeriesDetail;
