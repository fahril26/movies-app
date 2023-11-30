/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */

import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../style/ListGroupComponent.css";
import ImageLost from "./ImageLost";
import ChangeFormatDate from "./ChangeFormatDate";

const ListGroupComponent = ({ data, listFor, title }) => {
  const { tv_id } = useParams();

  const dataList = data?.map((item) => {
    const vote_average = String(item.vote_average).slice(0, 3);

    return {
      ...item,
      vote_average: Number(vote_average),
    };
  });

  const fetchYear = (yearOfRelease) => {
    return yearOfRelease.slice(0, 4);
  };

  const handleClick = (seasonNumber, index) => {
    localStorage.setItem("season_number", seasonNumber);
    localStorage.setItem("index", index);
  };

  const ChangeFormatDuration = ({ duration }) => {
    const hour = Math.floor(duration / 60);

    const minute = duration % 60;

    return (
      <span className="runtime">{` • ${
        hour ? hour + "h" : ""
      } ${minute}m`}</span>
    );
  };

  return (
    <ListGroup style={{ height: data?.length <= 3 || !data ? "75vh" : null }}>
      {listFor === "episode" ? (
        <h5>
          {data?.length
            ? `Total ${title} (${data?.length})`
            : "There are no episodes added to this season."}
        </h5>
      ) : null}

      {dataList?.map((item, index) => (
        <ListGroup.Item key={item.id} className="d-flex gap-4">
          <div className="poster">
            <Link
              to={`/tv-series-detail/${tv_id}/seasons/${item.season_number}`}
              onClick={
                listFor === "season"
                  ? () => handleClick(item.season_number, index)
                  : null
              }
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
                <ImageLost width={listFor === "episode" ? 150 : 110} />
              )}
            </Link>
          </div>

          <div className="detail-season">
            <div className="detail-info mt-2">
              <h5>
                {listFor === "episode" && item.episode_number + "."}{" "}
                <Link
                  to={`/tv-series-detail/${tv_id}/seasons/${item.season_number}`}
                  onClick={
                    listFor === "season"
                      ? () => handleClick(item.season_number, index)
                      : null
                  }
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
                  {<ChangeFormatDate date={item.air_date} />}

                  {item?.runtime && (
                    <ChangeFormatDuration duration={item?.runtime} />
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
