/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/ListGroupComponent.css";
import ImageLost from "./ImageLost";

const ListGroupComponent = ({ data, listFor, title }) => {
  const { tv_id } = useParams();

  const fetchYear = (yearOfRelease) => {
    return yearOfRelease.slice(0, 4);
  };

  const handleClick = (seasonNumber, index) => {
    localStorage.setItem("season_number", seasonNumber);
    localStorage.setItem("index", index);
  };

  const changeFormatDate = (date) => {
    if (date) {
      const dataDate = new Date(date);
      const splitDate = date.split("-");

      const monthNameList = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      const day = splitDate[2];
      const month = monthNameList[dataDate.getMonth()];
      const year = splitDate[0];

      return `${month} ${day}, ${year}`;
    }
  };

  const changeFormatDuration = (duration) => {
    const hour = Math.floor(duration / 60);

    const minute = duration % 60;

    return `${hour ? hour + "h" : ""} ${minute}m`;
  };

  return (
    <ListGroup style={{ height: data?.length ? "" : "220px" }}>
      {listFor === "episode" ? (
        <h5>{data?.length ? title + " " + data?.length : "No Data"}</h5>
      ) : null}

      {data?.map((item, index) => (
        <ListGroup.Item key={item.id} className="d-flex gap-4">
          <div className="poster">
            <Link
              to={`/tv-series-detail/${tv_id}/seasons/${item.season_number}`}
              onClick={() => handleClick(item.season_number, index)}
            >
              {item?.poster_path || item?.still_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w220_and_h330_face${
                    item.poster_path ? item.poster_path : item.still_path
                  }`}
                  alt="poster"
                  width={item.poster_path ? 110 : 150}
                />
              ) : (
                <ImageLost width={item.poster_path ? 110 : 150} />
              )}
            </Link>
          </div>

          <div className="detail-season">
            <div className="detail-info mt-2">
              <h5>
                {listFor === "episode" && item.episode_number + "."}{" "}
                <Link
                  to={`/tv-series-detail/${tv_id}/seasons/${item.season_number}`}
                  onClick={() => handleClick(item.season_number, index)}
                >
                  {item.name}
                </Link>
              </h5>

              {item.vote_average ? (
                <span className="rating">
                  <i className="bi bi-star-fill me-1"></i>
                  {item.vote_average}{" "}
                </span>
              ) : null}

              {listFor === "season" ? (
                <>
                  <span className="first-air-date">
                    {item.air_date ? fetchYear(item.air_date) + ` •` : "- •"}
                  </span>

                  <span className="episode-count">
                    {" "}
                    {item.episode_count} Episode
                  </span>
                </>
              ) : (
                <>
                  <span className="air_date">
                    {changeFormatDate(item.air_date)}
                  </span>

                  {item.runtime && (
                    <span className="runtime">
                      {" • "}
                      {changeFormatDuration(item?.runtime)}
                    </span>
                  )}
                </>
              )}
            </div>

            <div className="description mt-4">
              <p>{item.overview}</p>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ListGroupComponent;
