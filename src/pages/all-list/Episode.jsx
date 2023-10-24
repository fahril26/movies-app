import { Link } from "react-router-dom";
import MyNavbar from "../../components/Navbar";
import TvShowHeader from "../../components/TvShowHeader";
import useFetch from "../../hook/useFetch";
import { useParams } from "react-router-dom";
import ListGroupComponent from "../../components/ListGroupComponent";
import "../../style/Episode.css";
import Footer from "../../components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import AnimatedProgressBar from "../../components/AnimatedProgressBar";
import { useNavigate } from "react-router-dom";
import CurrentPageContext from "../../context/CurrentPageContext";

const Episode = () => {
  const [pagination, setPagination] = useState({
    prevLink: null,
    currentIndex: null,
    nextLink: null,
  });

  const { tv_id } = useParams();
  const navigate = useNavigate();

  const getDataSeason = useFetch(`https://api.themoviedb.org/3/tv/${tv_id}}`);
  const season = getDataSeason?.data?.seasons?.filter(
    (s) => s.season_number !== 0
  );
  const season_number = Number(localStorage.getItem("season_number"));
  const index = Number(localStorage.getItem("index"));

  const { data, loadingPersentage, showPersentageBar } = useFetch(
    `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}`
  );
  const listFor = "episode";

  const increment = () => {
    if (!loadingPersentage) {
      localStorage.setItem("index", index + 1);
      localStorage.setItem("season_number", season_number + 1);
      navigate(`/tv-series-detail/${tv_id}/seasons/${season_number + 1}`);
    }
  };

  const decrement = () => {
    if (!loadingPersentage) {
      localStorage.setItem("index", index - 1);
      localStorage.setItem("season_number", season_number - 1);
      navigate(`/tv-series-detail/${tv_id}/seasons/${season_number - 1}`);
    }
  };

  const handleChangePagination = () => {
    if (season) {
      const newPagination = pagination;
      newPagination.currentIndex = index;
      newPagination.nextLink = season[pagination.currentIndex + 1]?.name;
      if (season_number > 1)
        newPagination.prevLink = season[pagination.currentIndex - 1]?.name;

      setPagination(newPagination);
    }
  };

  useEffect(() => {
    handleChangePagination();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [season, season_number, index]);

  return (
    <>
      {showPersentageBar && <AnimatedProgressBar width={loadingPersentage} />}

      <CurrentPageContext>
        <MyNavbar fixed={"top"} />
      </CurrentPageContext>
      <div
        className="episode"
        style={{
          height:
            data?.episodes?.length && data?.episodes?.length > 2 ? "" : "100vh",
        }}
      >
        <TvShowHeader
          name={data?.name}
          poster={data?.poster_path}
          releaseDate={data?.air_date}
          prevLink={"List Seasons"}
          listFor={listFor}
          id={tv_id}
        />

        {season?.length > 1 && (
          <div className="navigation row">
            <div className="col-6">
              {pagination?.prevLink && pagination.currentIndex >= 1 && (
                <Link className="float-start" onClick={decrement}>
                  <i className="bi bi-arrow-left"></i>
                  {pagination.prevLink}
                </Link>
              )}
            </div>

            <div className="col-6">
              {pagination?.nextLink && (
                <Link className="float-end" onClick={increment}>
                  {pagination.nextLink} <i className="bi bi-arrow-right"></i>
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="list-episode">
          <ListGroupComponent
            data={data?.episodes}
            listFor={listFor}
            title={"Episode"}
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Episode;
