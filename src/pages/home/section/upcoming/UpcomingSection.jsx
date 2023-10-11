import Header from "../../../../components/Header";
import MyCard from "../../../../components/MyCard";
import MyNav from "../../../../components/MyNav";

import "../../../../style/UpcomingSection.css";
import useFetch from "../../../../hook/useFetch";

import useGetDataRandom from "../../../../hook/useGetDataRandom";
import PlaceholderCard from "../../../../components/PlaceholderCard";
import { useContext } from "react";
import { ResizeContext } from "../../../../context/WindowWidthContext";
import useSetCardTotals from "../../../../hook/useSetCardTotals";

const url = "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1";

const UpcomingSection = () => {
  const { data, loading } = useFetch(url);

  const windowWidth = useContext(ResizeContext);
  const dataComponent = {
    windowWidth,
    initialValue: 4,
    newValue: 6,
  };

  const cardTotals = useSetCardTotals(dataComponent);

  const getDataRandom = useGetDataRandom(data, cardTotals);

  const link = "upcoming-list";
  const type = "movie";

  return (
    <section id="upcoming-movies" className="upcoming-movies bg-dark ">
      <div className="container--fluid">
        <div className="row">
          <Header className={"col-lg-6 col-12"}>
            <h5>ONLINE STREAMING</h5>
            <h1>Upcoming Movies</h1>
          </Header>
          <div className="col-lg-6 col-12 align-self-end">
            <div className="ucm-nav-wrap">
              <MyNav link={link} />
            </div>
          </div>
        </div>

        <div className=" row row-cols-2 row-cols-md-3 row-cols-lg-4 pt-5 ucm-cards-wrapper">
          {getDataRandom?.map((data) => (
            <div className="col d-flex justify-content-center " key={data.id}>
              {loading ? (
                <PlaceholderCard />
              ) : (
                <MyCard
                  poster={data.poster_path}
                  title={data.title}
                  voteAverage={data.vote_average}
                  releaseDate={data.release_date}
                  id={data.id}
                  type={type}
                  width={"95%"}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingSection;
