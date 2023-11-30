/* eslint-disable react/prop-types */
import useFetch from "../hook/useFetch";
import "../style/LayoutMovieDetail.css";
import MyNavbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { Badge, Button, Nav } from "react-bootstrap";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import ImageLost from "./ImageLost";
import { useContext } from "react";
import { TrailerContext } from "../context/ModaltrailerContext";
import ModalWatchNow from "../components/ModalWatchNow";
import CurrentPageContext from "../context/CurrentPageContext";
import Loading from "../components/Loading";

const LayoutMovieDetail = ({ type }) => {
  const { modalShow, setModalShow, handleShowModal } =
    useContext(TrailerContext);

  const handleChangeUrl = (urlMovie, urlTv) => {
    let url = null;
    type === "movie" ? (url = urlMovie) : (url = urlTv);

    return url;
  };

  const id = useParams();

  const url = handleChangeUrl(
    `https://api.themoviedb.org/3/movie/`,
    `https://api.themoviedb.org/3/tv/`
  );

  const useId = type === "movie" ? id.movie_id : id.tv_id;

  const { data, showPersentageBar } = useFetch(url + useId);
  const getCredits = useFetch(url + `${useId}/credits`);
  const getVideo = useFetch(url + `${useId}/videos`);

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

  const getOfficialTrailer = getVideo?.data?.results.find((data) =>
    data.name.includes("Trailer")
  );

  return (
    <>
      {showPersentageBar ? (
        <Loading />
      ) : (
        <>
          <CurrentPageContext>
            <MyNavbar fixed={"top"} />
          </CurrentPageContext>
          <div className="detail-movie">
            <div className="container-fluid mt-5 px-0">
              <div className="row  gap-md-3 gap-5 justify-content-center justify-content-lg-start">
                <div className="poster col-5  col-lg-4 col-xl-3  justify-content-center d-flex">
                  {!showPersentageBar && data?.poster_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w220_and_h330_face${data?.poster_path}`}
                      alt=""
                      width={"100%"}
                    />
                  ) : (
                    <ImageLost />
                  )}
                </div>

                <div className="col-12 col-md-10 col-xl-6 px-4 px-lg-0">
                  {!showPersentageBar ? (
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
                      <div className=" mt-4 w-100 ">
                        {type === "movie" ? (
                          <div className="row">
                            <div className="col-8">
                              <p className="fw-semibold m-0">Director : </p>
                              <ul className="director d-flex  flex-wrap w-100 m-0 p-0 gap-2  ">
                                {getDirector?.length > 0 ? (
                                  getDirector?.map((data) => (
                                    <Badge key={data?.id} bg="secondary">
                                      <li>
                                        {data?.name ? data.name : "No Data"}
                                      </li>
                                    </Badge>
                                  ))
                                ) : (
                                  <p>No Data</p>
                                )}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <div className="row">
                            <div className="col-8">
                              <p className="fw-semibold m-0">Producer: </p>
                              <ul className="producer d-flex  flex-wrap w-100 m-0 p-0 gap-2 ">
                                {getProducer?.length > 0 ? (
                                  getProducer?.map((data) => (
                                    <Badge key={data.id} bg="secondary">
                                      <li>{data?.name}</li>
                                    </Badge>
                                  ))
                                ) : (
                                  <p>No Data</p>
                                )}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>

                      {type === "movie" && (
                        <div className="btn-trailer-wrapper mt-4">
                          <Button
                            size="sm"
                            onClick={() => handleShowModal(getOfficialTrailer)}
                          >
                            Watch Trailer
                          </Button>
                        </div>
                      )}

                      {type === "tv" && (
                        <div className="mt-4 d-flex gap-3 align-items-end  navigation">
                          <Link to={`/tv-series-detail/${useId}/seasons`}>
                            See All Seasons
                          </Link>

                          <div className="btn-trailer-wrapper">
                            <Button
                              size="sm"
                              onClick={() =>
                                handleShowModal(getOfficialTrailer)
                              }
                            >
                              Watch Trailer
                            </Button>
                          </div>
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

          <ModalWatchNow
            show={modalShow}
            onHide={() => setModalShow(false)}
            data={getOfficialTrailer?.key}
          />
        </>
      )}
    </>
  );
};

export default LayoutMovieDetail;
