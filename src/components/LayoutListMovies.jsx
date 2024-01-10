/* eslint-disable react/prop-types */
import Header from "./Header";
import "../style/AllList.css";
import ListMoviesComponent from "./ListMoviesComponent";
import Footer from "../components/Footer";
import AnimatedProgressBar from "./AnimatedProgressBar";
import MyNavbar from "./Navbar";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
const LayoutListMovies = ({
  fetchData,
  setCurrentPage,
  currentPage,
  titlePage,
  secondTitlePage,
  type,
}) => {
  const [pageNumbers, setPageNumbers] = useState(
    JSON.parse(localStorage.getItem("paginationNumbers"))
  );

  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstLoad(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {firstLoad ? (
        <Loading />
      ) : (
        <>
          <MyNavbar fixed={"top"} setPageNumbers={setPageNumbers} />
          {fetchData?.showPersentageBar ? (
            <AnimatedProgressBar width={fetchData?.loadingPersentage} />
          ) : null}

          <div className="all-list">
            <div className="container-fluid">
              <div className="row align-items-end justify-content-between ">
                <div className="col-lg-9  col-8">
                  <Header>
                    <h5>{secondTitlePage}</h5>
                    <h1>{titlePage}</h1>
                  </Header>
                </div>
              </div>

              {!fetchData.loading ? (
                <ListMoviesComponent
                  fetchData={fetchData}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                  type={type}
                  show={fetchData?.showPersentageBar}
                  pageNumbers={pageNumbers}
                  setPageNumbers={setPageNumbers}
                  loading={fetchData.showPersentageBar}
                />
              ) : (
                <div className="loading" style={{ height: "100vh" }}></div>
              )}
            </div>
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default LayoutListMovies;
