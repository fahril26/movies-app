import { useContext } from "react";
import Header from "../../../../components/Header";
import MyCard from "../../../../components/MyCard";
import MyNav from "../../../../components/MyNav";
import PlaceholderCard from "../../../../components/PlaceholderCard";
import useFetch from "../../../../hook/useFetch";
import useGetDataRandom from "../../../../hook/useGetDataRandom";
import "../../../../style/BestTvSeriesSection.css";
import { ResizeContext } from "../../../../context/WindowWidthContext";
import useSetCardTotals from "../../../../hook/useSetCardTotals";

const BestTvSeriesSection = () => {
  const { data, loading } = useFetch(
    "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1"
  );

  const windowWidth = useContext(ResizeContext);
  const dataComponent = {
    windowWidth,
    initialValue: 4,
    newValue: 6,
  };

  const cardTotals = useSetCardTotals(dataComponent);

  const getDataRandom = useGetDataRandom(data, cardTotals);

  const link = "best-tv-series-list";
  const type = "tv";

  return (
    <section className="best-tv-series" id="best-tv-series">
      <div className="container-fluid">
        <div className="row jutify-content-center text-center">
          <div className="col-12">
            <Header>
              <h5>BEST TV</h5>
              <h1>Wolrd Best TV Series</h1>
            </Header>
          </div>
        </div>

        <div className="row mt-4">
          <MyNav link={link} />
        </div>

        <div className="row mt-4 best-tv-cards-wrapper row-gap-4 row row-cols-2 row-cols-md-3 row-cols-lg-4">
          {getDataRandom?.map((data) => (
            <div className="col d-flex justify-content-center" key={data.id}>
              {loading ? (
                <PlaceholderCard />
              ) : (
                <MyCard
                  poster={data.poster_path}
                  title={data.name}
                  voteAverage={data.vote_average}
                  releaseDate={data.first_air_date}
                  id={data.id}
                  type={type}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestTvSeriesSection;
