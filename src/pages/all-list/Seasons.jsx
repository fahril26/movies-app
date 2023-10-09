import { useParams } from "react-router-dom";
import useFetch from "../../hook/useFetch";
import "../../style/Season.css";
import MyNavbar from "../../components/Navbar";
import TvShowHeader from "../../components/TvShowHeader";
import Footer from "../../components/Footer";
import ListGroupComponent from "../../components/ListGroupComponent";

const Seasons = () => {
  const { tv_id } = useParams();
  const { data, loading } = useFetch(
    `https://api.themoviedb.org/3/tv/${tv_id}`
  );
  const listFor = "season";

  return (
    <>
      <div className="seasons">
        <MyNavbar fixed={"top"} />
        <TvShowHeader
          name={data?.name}
          releaseDate={data?.first_air_date}
          poster={data?.poster_path}
        />

        <div className="list-seasons">
          <ListGroupComponent data={data?.seasons} listFor={listFor} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Seasons;
