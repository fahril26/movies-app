/* eslint-disable react/prop-types */
import Header from "./Header";
import "../style/AllList.css";
import ListMoviesComponent from "./ListMoviesComponent";
import Footer from "../components/Footer";
import MyNavbar from "../components/Navbar";
import AnimatedProgressBar from "./AnimatedProgressBar";

const LayoutListMovies = ({
  fetchData,
  setCurrentPage,
  currentPage,
  titlePage,
  secondTitlePage,
  type,
}) => {
  return (
    <>
      <MyNavbar fixed={"top"} />
      <div className="all-list">
        {fetchData?.showPersentageBar ? (
          <AnimatedProgressBar width={fetchData?.loadingPersentage} />
        ) : null}
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-10 col-sm-9 col-8">
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
              loading={fetchData.showPersentageBar}
            />
          ) : (
            <div className="loading" style={{ height: "100vh" }}></div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LayoutListMovies;
