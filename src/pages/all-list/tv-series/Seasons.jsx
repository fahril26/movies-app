import { useParams } from "react-router-dom";
import useFetch from "../../../hook/useFetch";

import MyNavbar from "../../../components/Navbar";
import TvShowHeader from "../../../components/TvShowHeader";
import Footer from "../../../components/Footer";
import ListGroupComponent from "../../../components/ListGroupComponent";
import CurrentPageContext from "../../../context/CurrentPageContext";
import "../../../style/Season.css";

const Seasons = () => {
  const { tv_id } = useParams();
  const { data, loading } = useFetch(
    `https://api.themoviedb.org/3/tv/${tv_id}`
  );
  const listFor = "season";

  const getDataSeason = data?.seasons.filter((s) => s.season_number !== 0);

  console.log(data?.seasons);

  return (
    <div className="seasons">
      <CurrentPageContext>
        <MyNavbar fixed={"top"} />
      </CurrentPageContext>
      <TvShowHeader
        name={data?.name}
        releaseDate={data?.first_air_date}
        poster={data?.poster_path}
        listFor={listFor}
        id={tv_id}
      />

      <div className="list-seasons">
        <ListGroupComponent data={getDataSeason} listFor={listFor} />
      </div>
      <Footer />
    </div>
  );
};

export default Seasons;
