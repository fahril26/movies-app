/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

import "../style/TvShowHeader.css";
import useFetchYear from "../hook/useFetchYear";
import ImageLost from "./ImageLost";

const TvShowHeader = ({ name, releaseDate, poster, prevLink, listFor, id }) => {
  const getYearRelease = useFetchYear(releaseDate);

  return (
    <header className="tv-show-header">
      <div className=" d-flex align-items-center gap-3">
        {poster ? (
          <img
            src={`https://image.tmdb.org/t/p/w220_and_h330_face${poster}`}
            alt="poster"
            width={80}
            className="rounded-1"
          />
        ) : (
          <div className="w-0">
            <ImageLost width={80} />
          </div>
        )}

        <div className="header-title">
          <h2 className="mb-2">
            {name ? name : "Data Not Found"}{" "}
            {getYearRelease && (
              <span className="text-white-50">{`(${getYearRelease})`}</span>
            )}
          </h2>

          <Link
            to={
              listFor === "episode"
                ? `/tv-series-detail/${id}/seasons`
                : `/tv-series-detail/${id}`
            }
          >
            <i className="bi bi-arrow-left-short ">
              Back to {prevLink ? prevLink : "Main"}
            </i>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default TvShowHeader;
