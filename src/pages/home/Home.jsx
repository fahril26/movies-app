import Footer from "../../components/Footer";
import Jumbotron from "../../components/Jumbotron";
import BestTvSeriesSection from "./section/best-tv-series/BestTvSeriesSection";
import LiveAreaSection from "./section/live-area/LiveAreaSection";
import TopRatedSection from "./section/toprated/TopRatedSection";
import UpcomingSection from "./section/upcoming/UpcomingSection";
import MyNavbar from "../../components/Navbar";

const Home = () => {
  return (
    <main id="home" className="home">
      <MyNavbar fixed={"top"} />
      <Jumbotron />
      <UpcomingSection />
      <TopRatedSection />
      <LiveAreaSection />
      <BestTvSeriesSection />
      <Footer />
    </main>
  );
};

export default Home;
