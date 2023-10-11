/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Header from "../../../../components/Header";
import MyOdometer from "../../../../components/MyOdometer";
import "../../../../style/LifeAreaSection.css";
import Img from "../../../../assets/background/live_img.png";

const LiveAreaSection = ({ handleShowModal }) => {
  return (
    <section className="live-area" id="live-area">
      <div className="container-fluid py-5">
        <div className="row justify-content-between">
          <div className="col-12 col-lg-6 description p-0">
            <Header>
              <h5 className="fs-6 text-secondary">ONLINE STREAMING</h5>
              <h1 style={{ color: "#000", width: "75%" }}>
                Live Movie & TV Shows For Friends & Family
              </h1>
            </Header>

            <p className="mt-4 w-75">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto
              architecto accusantium ipsa officia odit provident quas esse
              perferendis ullam nobis?
            </p>

            <div className="row align-items-center">
              <div className="resolution   col-4  col-lg-5">
                <span>HD 4K</span>
              </div>

              <div className="active-customer col  p-0 ">
                <div className="viewers">
                  <MyOdometer />K<span className="plus">+</span>
                </div>
                <span className="text">Active Customer</span>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-5 ">
                <Link
                  to={"https://www.youtube.com/watch?v=b8Jvw_vzQN0"}
                  className="watch-now"
                  onClick={handleShowModal}
                >
                  <i className="bi bi-play-fill fs-4"></i> watch now
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6 live-area-img mt-5 mt-lg-0">
            <img src={Img} alt="img" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveAreaSection;
