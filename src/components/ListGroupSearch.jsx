/* eslint-disable react/prop-types */
import "../style/ListGroupSearch.css";
import ImageLost from "./ImageLost";
import ChangeFormatDate from "./ChangeFormatDate";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ListGroupSearch = ({
  poster,
  title,
  releaseDate,
  overview,
  type,
  id,
}) => {
  const navigate = useNavigate();

  const handleShortenOverview = (string) => {
    let newString = "";

    if (string.length > 200) newString = string.slice(0, 150) + "...";
    else newString = string.slice();

    return newString;
  };

  const shortenOverview = handleShortenOverview(overview);

  const navigateTo = () => {
    type === "movie"
      ? navigate(`/movie-detail/${id}`)
      : navigate(`/tv-series-detail/${id}`);
  };

  return (
    <div className="card-list-search">
      <div className="d-flex">
        <div className="image">
          {poster ? (
            <img
              src={`https://image.tmdb.org/t/p/w220_and_h330_face${poster}`}
              alt="poster"
              width={"130%"}
              style={{ borderRadius: "5px 0 0 5px" }}
              onClick={navigateTo}
            />
          ) : (
            <ImageLost width={"100%"} handleClick={navigateTo} />
          )}
        </div>

        <div className=" description px-5 ">
          <header>
            <h5>
              <Link
                to={
                  type === "movie"
                    ? `/movie-detail/${id}`
                    : `/tv-series-detail/${id}`
                }
              >
                {title}
              </Link>
            </h5>
            <ChangeFormatDate date={releaseDate} />
          </header>

          <p>{shortenOverview}</p>
        </div>
      </div>
    </div>
  );
};

export default ListGroupSearch;
