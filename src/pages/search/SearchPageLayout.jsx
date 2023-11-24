import { Outlet } from "react-router-dom";
import MyNavbar from "../../components/Navbar";
import "../../style/SeachLayout.css";
import { NavLink } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import useFetch from "../../hook/useFetch";
import Footer from "../../components/Footer";
import AnimationExample from "../../components/Placeholder";
import { useLocation } from "react-router-dom";

export default function SearchPageLayout() {
  const keywordSearch = localStorage.getItem("keywordSearch");

  const moviesData = useFetch(
    `https://api.themoviedb.org/3/search/movie?query=${keywordSearch}&include_adult=false&language=en-US&page=1`
  );

  const tvShowData = useFetch(
    `https://api.themoviedb.org/3/search/tv?query=${keywordSearch}&include_adult=false&language=en-US&page=1`
  );

  const setFormatNumber = (number) => {
    return number?.toLocaleString("id-ID");
  };

  const { pathname } = useLocation();

  const currentPathName = pathname.split("/")[2];

  const totalMoviesData = setFormatNumber(moviesData?.data?.total_results);

  const totalTvShowData = setFormatNumber(tvShowData?.data?.total_results);

  return (
    <>
      <MyNavbar fixed={"top"} />
      <div className="searching-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-12">
              <div className="search-results-list ">
                <header>
                  <h5>Search Results</h5>
                </header>

                <ListGroup as="ul">
                  <ListGroup.Item as="li">
                    {moviesData.showPersentageBar ? (
                      <AnimationExample
                        style={{ width: "100%", padding: "20px" }}
                        size={"md"}
                        totalItems={1}
                      />
                    ) : (
                      <NavLink
                        to={"/search/movies/1"}
                        className={currentPathName === "movies" && "active"}
                      >
                        Movies {`(${totalMoviesData ? totalMoviesData : "0"})`}
                      </NavLink>
                    )}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    {tvShowData.showPersentageBar ? (
                      <AnimationExample
                        style={{ width: "100%", padding: "20px" }}
                        size={"md"}
                        totalItems={1}
                      />
                    ) : (
                      <NavLink
                        to={"/search/tv/1"}
                        className={currentPathName === "tv" && "active"}
                      >
                        Tv Show {`(${totalTvShowData ? totalTvShowData : "0"})`}
                      </NavLink>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>

            <div className="col-12 col-lg-9 py-5 py-lg-0">
              {!moviesData.showPersentageBar ? (
                <Outlet />
              ) : (
                <AnimationExample
                  style={{ width: "100%", padding: "20px" }}
                  size={"md"}
                  totalItems={6}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
