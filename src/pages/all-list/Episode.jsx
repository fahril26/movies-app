import { Link } from "react-router-dom";
import MyNavbar from "../../components/Navbar";
import TvShowHeader from "../../components/TvShowHeader";
import useFetch from "../../hook/useFetch";
import { useParams } from "react-router-dom";
import ListGroupSeasons from "../../components/ListGroupComponent";
import "../../style/Episode.css";
import Footer from "../../components/Footer";
import { useState } from "react";
import { useEffect } from "react";

const Episode = () => {
  const [pagination, setPagination] = useState({
    prevLink: null,
    currentIndex: null,
    nextLink: null,
  });

  const { tv_id } = useParams();

  const getDataSeason = useFetch(`https://api.themoviedb.org/3/tv/${tv_id}}`);
  const season = getDataSeason?.data?.seasons;
  const season_number = Number(localStorage.getItem("season_number"));
  const currentIndex = Number(localStorage.getItem("index"));
  const { data, loading } = useFetch(
    `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}`
  );
  const listFor = "episode";

  const increment = () => {
    localStorage.setItem("index", currentIndex + 1);
    localStorage.setItem("season_number", season_number + 1);
  };

  const decrement = () => {
    localStorage.setItem("index", currentIndex - 1);
    localStorage.setItem("season_number", season_number - 1);
  };

  useEffect(() => {
    if (season) {
      const newPagination = pagination;
      newPagination.currentIndex = currentIndex;
      newPagination.nextLink = season[currentIndex + 1]?.name;
      if (season?.length > 1)
        newPagination.prevLink = season[currentIndex - 1]?.name;
      setPagination(newPagination);
    }
  }, [season, season_number, currentIndex]);

  return (
    <>
      <div className="episode">
        <MyNavbar fixed={top} />

        <TvShowHeader
          name={data?.name}
          poster={data?.poster_path}
          releaseDate={data?.air_date}
          prevLink={"List Seasons"}
        />

        {season?.length > 1 && (
          <div className="navigation row">
            <div className="col-6">
              {pagination.prevLink && season?.length - 1 !== 0 && (
                <Link className="float-start" onClick={decrement}>
                  <i className="bi bi-arrow-left"></i>
                  {pagination.prevLink}
                </Link>
              )}
            </div>

            <div className="col-6">
              {pagination.nextLink && (
                <Link className="float-end" onClick={increment}>
                  {pagination.nextLink} <i className="bi bi-arrow-right"></i>
                </Link>
              )}
            </div>
          </div>
        )}

        <div className="list-episode">
          <ListGroupSeasons
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
