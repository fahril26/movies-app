import LayoutMovieDetail from "../../components/LayoutMovieDetail";
import ModaltrailerContext from "../../context/ModaltrailerContext";

const MovieDetail = () => {
  return (
    <ModaltrailerContext>
      <LayoutMovieDetail type={"movie"} />
    </ModaltrailerContext>
  );
};

export default MovieDetail;
