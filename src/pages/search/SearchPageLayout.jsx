import { Outlet } from "react-router-dom";
import MyNavbar from "../../components/Navbar";
import "../../style/SeachLayout.css";
import { NavLink } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import useFetch from "../../hook/useFetch";
import AnimationExample from "../../components/Placeholder";

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

  const totalMoviesData = setFormatNumber(moviesData?.data?.total_results);

  const totalTvShowData = setFormatNumber(tvShowData?.data?.total_results);

  return (
    <>
      <MyNavbar fixed={"top"} />

      <div className="searching-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-3">
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
                      <NavLink to={"/search/movies/1"}>
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
                      <NavLink to={"/search/tv/1"}>
                        Tv Show {`(${totalTvShowData ? totalTvShowData : "0"})`}
                      </NavLink>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </div>

            <div className="col-9">
              {!moviesData.showPersentageBar ? (
                <Outlet />
              ) : (
                <AnimationExample
                  style={{
                    padding: "25px",
                    borderRadius: "5px",
                    width: "100%",
                  }}
                  size={"lg"}
                  totalItems={7}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
