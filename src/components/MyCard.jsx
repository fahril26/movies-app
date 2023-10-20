/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import "../style/MyCard.css";
import { Link } from "react-router-dom";
import ImageLost from "./ImageLost";
import { useNavigate } from "react-router-dom";

const MyCard = ({
  className,
  poster,
  title,
  voteAverage,
  releaseDate,
  id,
  type,
  width,
}) => {
  const navigate = useNavigate();

  return (
    <Card
      className={className}
      style={{
        width: width ? width : "90%",
        animation: "showUp 1s ease-in-out",
      }}
    >
      {poster ? (
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w220_and_h330_face${poster}`}
          className="rounded"
          alt="poster"
          height={350}
          onClick={() =>
            navigate(
              type == "movie"
                ? `/movie-detail/${id}`
                : `/tv-series-detail/${id}`
            )
          }
        />
      ) : (
        <ImageLost
          handleClick={function handleClick() {
            navigate(
              type == "movie"
                ? `/movie-detail/${id}`
                : `/tv-series-detail/${id}`
            );
          }}
        />
      )}

      <Card.Body>
        <Card.Title style={{ height: "20px", fontSize: "0.9rem" }}>
          <div className="row">
            <div className="col-12 p-0">
              <Link
                to={
                  type == "movie"
                    ? `/movie-detail/${id}`
                    : `tv-series-detail/${id}`
                }
              >
                {title}
              </Link>
            </div>
          </div>
        </Card.Title>

        <div className="row mt-3 align-items-center">
          <div className="col-8 resolution p-0">
            <span>Release: {releaseDate}</span>
          </div>
          <div className="col-4 p-0 d-flex gap-3 justify-content-end">
            <span className="rating">
              <i className="bi bi-hand-thumbs-up-fill me-2"></i>
              {voteAverage}
            </span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MyCard;
