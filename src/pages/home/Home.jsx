import Footer from "../../components/Footer";
import Jumbotron from "../../components/Jumbotron";
import BestTvSeriesSection from "./section/best-tv-series/BestTvSeriesSection";
import LiveAreaSection from "./section/live-area/LiveAreaSection";
import TopRatedSection from "./section/toprated/TopRatedSection";
import UpcomingSection from "./section/upcoming/UpcomingSection";
import MyNavbar from "../../components/Navbar";
import { TrailerContext } from "../../context/ModaltrailerContext";
import ModalWatchNow from "../../components/ModalWatchNow";
import { useContext } from "react";

const Home = () => {
  const { modalShow, handleShowModal, setModalShow } =
    useContext(TrailerContext);

  return (
    <main id="home" className="home">
      <MyNavbar fixed={"top"} />
      <Jumbotron />
      <UpcomingSection handleShowModal={handleShowModal} />
      <TopRatedSection handleShowModal={handleShowModal} />
      <LiveAreaSection handleShowModal={handleShowModal} />
      <BestTvSeriesSection handleShowModal={handleShowModal} />
      <Footer />

      <ModalWatchNow show={modalShow} onHide={() => setModalShow(false)} />
    </main>
  );
};

export default Home;
