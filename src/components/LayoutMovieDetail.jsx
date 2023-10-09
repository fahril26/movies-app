/* eslint-disable react/prop-types */
import useFetch from "../hook/useFetch";
import "../style/LayoutMovieDetail.css";
import MyNavbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import ImageLost from "./ImageLost";

const type = localStorage.getItem("type");

const handleChangeUrl = () => {
  let url = null;
  type === "movie"
    ? (url = `https://api.themoviedb.org/3/movie/`)
    : (url = `https://api.themoviedb.org/3/tv/`);

  return url;
};

const url = handleChangeUrl();

const LayoutMovieDetail = () => {
  const id = useParams();

  const useId = type === "movie" ? id.movie_id : id.tv_id;

  const { data, loading } = useFetch(url + useId);

  const getCredits = useFetch(url + `${useId}/credits`);

  const formatDuration = (timeTotal) => {
    const hour = Math.floor(timeTotal / 60);
    const minute = timeTotal % 60;

    return `${hour}h ${minute}m`;
  };

  const findDirector = (data) => {
    return data.job === "Director";
  };

  const findProducer = (data) => {
    return data.job === "Producer";
  };

  const getCrew = getCredits?.data?.crew;

  const getDuration = formatDuration(data?.runtime);

  const getDirector = getCrew?.filter(findDirector);

  const getProducer = getCrew?.filter(findProducer);

  return (
    <>
      <div className="movie-detail">
        <MyNavbar fixed={"top"} />
        <div className="container-fluid mt-5 px-0">
          <div className="content row  gap-md-3 gap-5 justify-content-center justify-content-md-start">
            <div className="poster col-11 col-md-5 col-lg-4 col-xl-3">
              {!loading ? (
                <img
                  src={`https://image.tmdb.org/t/p/w220_and_h330_face${data?.poster_path}`}
                  alt=""
                  width={"100%"}
                />
              ) : (
                <ImageLost />
              )}
            </div>

            <div className="col-12 col-md-7 xl-6 ">
              {!loading ? (
                <>
                  <header>
                    <h1>{type === "movie" ? data?.title : data?.name}</h1>

                    <div className="additional-info d-flex align-items-center gap-3 mt-3 mb-2">
                      <span>
                        <i className="bi bi-hand-thumbs-up-fill me-1"></i>
                        {Math.floor(data?.vote_average * 10) / 10}
                      </span>
                      <span>
                        <i className="bi bi-calendar4 me-1"></i>{" "}
                        {type === "movie"
                          ? data?.release_date
                          : data?.first_air_date}
                      </span>
                      {type === "movie" && (
                        <span>
                          <i className="bi bi-clock"></i> {getDuration}
                        </span>
                      )}
                      |
                      <div className="genre">
                        <Nav defaultActiveKey="/home" as="ul">
                          {data?.genres.map((item, index) => (
                            <Nav.Item as="li" key={item.id}>
                              <Nav.Link
                                style={{
                                  marginLeft: index !== 0 ? "3px" : null,
                                }}
                              >
                                {index === data?.genres?.length - 1
                                  ? item.name
                                  : item.name + ","}
                              </Nav.Link>
                            </Nav.Item>
                          ))}
                        </Nav>
                      </div>
                    </div>

                    <i className="text-secondary">{data?.tagline}</i>
                  </header>
                  <div className="overview mt-4">
                    <p>{data?.overview}</p>
                  </div>
                  <div className="d-flex  gap-5 mt-4">
                    {type === "movie" ? (
                      <div className="director">
                        <p className="fw-semibold">Director : </p>
                        {getDirector == true ? (
                          getDirector?.map((data) => (
                            <p key={data?.id}>{data?.name}</p>
                          ))
                        ) : (
                          <p>No Data</p>
                        )}
                      </div>
                    ) : (
                      <div className="producer">
                        <p className="fw-semibold">Producer : </p>
                        {getProducer == true ? (
                          getProducer?.map((data) => (
                            <p key={data?.id}>{data?.name}</p>
                          ))
                        ) : (
                          <p>No Data</p>
                        )}
                      </div>
                    )}
                  </div>

                  {type === "tv" && (
                    <div className="mt-4">
                      <Link to={`/tv-series-detail/${useId}/seasons`}>
                        See All Seasons
                      </Link>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <h5 className=" placeholder-glow">
                    <span className="placeholder col-6"></span>
                  </h5>
                  <p className="card-text placeholder-glow">
                    <span className="placeholder mt-5 col-8"></span>
                    <span className="placeholder mt-5 col-9"></span>
                    <span className="placeholder mt-4 col-10"></span>
                    <span className="placeholder mt-4 col-11"></span>
                    <span className="placeholder mt-4 col-12"></span>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LayoutMovieDetail;
