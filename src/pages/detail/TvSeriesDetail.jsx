import LayoutMovieDetail from "../../components/LayoutMovieDetail";
import ModaltrailerContext from "../../context/ModaltrailerContext";

const TvSeriesDetail = () => {
  return (
    <ModaltrailerContext>
      <LayoutMovieDetail type={"tv"} />
    </ModaltrailerContext>
  );
};

export default TvSeriesDetail;
