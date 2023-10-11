/* eslint-disable react/prop-types */
import { Card } from "react-bootstrap";
import "../style/MyCard.css";
import { Link } from "react-router-dom";
import MyNav from "./MyNav";
import ImageLost from "./ImageLost";

const MyCard = ({
  className,
  poster,
  title,
  voteAverage,
  releaseDate,
  id,
  type,
  width,
  handleShowModal,
}) => {
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
        />
      ) : (
        <ImageLost />
      )}

      <Card.Body>
        <Card.Title style={{ height: "20px", fontSize: "0.9rem" }}>
          <div className="row">
            <div className="col-12 p-0">
              <Link to={`/movie-detail/${id}`}>{title}</Link>
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

      <div className="extra-content">
        <MyNav width={{ width: "130px" }} className={"watch-now"}>
          <button onClick={handleShowModal}>Trailer</button>
        </MyNav>

        <MyNav
          width={{ width: "130px" }}
          className={"mt-4 detail"}
          link={
            type == "movie" ? `/movie-detail/${id}` : `tv-series-detail/${id}`
          }
        >
          Details
        </MyNav>
      </div>
    </Card>
  );
};

export default MyCard;
