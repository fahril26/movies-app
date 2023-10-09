/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Header from "./Header";
import "../style/AllList.css";
import ListMoviesComponent from "./ListMoviesComponent";
import Footer from "../components/Footer";

const LayoutListMovies = ({
  fetchData,
  setCurrentPage,
  currentPage,
  titlePage,
  secondTitlePage,
  loading,
  type,
}) => {
  return (
    <div className="all-list bg-dark">
      <div className="container-fluid">
        <div className="row navigate-back">
          <Link to={-1}>
            <i className="bi bi-arrow-left"></i> Back
          </Link>
        </div>
        <div className="row">
          <div className="col-lg-10 col-sm-9 col-8">
            <Header>
              <h5>{secondTitlePage}</h5>
              <h1>{titlePage}</h1>
            </Header>
          </div>
        </div>

        <ListMoviesComponent
          fetchData={fetchData}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          loading={loading}
          type={type}
        />
      </div>

      <Footer className={"mt-5"} />
    </div>
  );
};

export default LayoutListMovies;
