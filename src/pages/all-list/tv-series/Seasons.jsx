import { useParams } from "react-router-dom";
import useFetch from "../../../hook/useFetch";

import MyNavbar from "../../../components/Navbar";
import TvShowHeader from "../../../components/TvShowHeader";
import Footer from "../../../components/Footer";
import ListGroupComponent from "../../../components/ListGroupComponent";
import CurrentPageContext from "../../../context/CurrentPageContext";
import "../../../style/Season.css";
import { useContext } from "react";
import { ResizeContext } from "../../../context/WindowWidthContext";

const Seasons = () => {
  const windowWidth = useContext(ResizeContext);

  const { tv_id } = useParams();
  const { data, loading } = useFetch(
    `https://api.themoviedb.org/3/tv/${tv_id}`
  );
  const listFor = "season";

  const getDataSeason = data?.seasons.filter((s) => s.season_number !== 0);

  return (
    <>
      <div
        className="seasons"
        style={{
          height: data?.seasons?.length > 2 && windowWidth > 768 ? "" : "",
        }}
      >
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
      </div>
      <Footer />
    </>
  );
};

export default Seasons;
