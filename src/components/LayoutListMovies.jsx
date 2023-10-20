/* eslint-disable react/prop-types */
import Header from "./Header";
import "../style/AllList.css";
import ListMoviesComponent from "./ListMoviesComponent";
import Footer from "../components/Footer";
import AnimatedProgressBar from "./AnimatedProgressBar";
import MyNavbar from "./Navbar";
import ModaltrailerContext from "../context/ModaltrailerContext";

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
      {fetchData?.showPersentageBar ? (
        <AnimatedProgressBar width={fetchData?.loadingPersentage} />
      ) : null}

      <div className="all-list">
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
            <ModaltrailerContext>
              <ListMoviesComponent
                fetchData={fetchData}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                type={type}
                loading={fetchData.showPersentageBar}
              />
            </ModaltrailerContext>
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
