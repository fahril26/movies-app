import { useContext } from "react";
import Header from "../../../../components/Header";
import MyCard from "../../../../components/MyCard";
import MyNav from "../../../../components/MyNav";
import PlaceholderCard from "../../../../components/PlaceholderCard";
import useFetch from "../../../../hook/useFetch";
import useGetDataRandom from "../../../../hook/useGetDataRandom";
import "../../../../style/TopRatedSection.css";
import { ResizeContext } from "../../../../context/WindowWidthContext";
import useSetCardTotals from "../../../../hook/useSetCardTotals";

// eslint-disable-next-line react/prop-types
const TopRatedSection = ({ handleShowModal }) => {
  const { data, loading } = useFetch(
    "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1"
  );

  const windowWidth = useContext(ResizeContext);
  const dataComponent = {
    windowWidth,
    initialValue: 8,
    newValue: 9,
  };

  const cardTotals = useSetCardTotals(dataComponent);

  const getDataRandom = useGetDataRandom(data, cardTotals);

  const link = "/movies/top-rated/1";

  const type = "movie";

  return (
    <section className="top-rated" id="top-rated">
      <div className="container-fluid">
        <div className="row justify-content-center text-center">
          <div className="col-12">
            <Header>
              <h5>ONLINE STREAMING</h5>
              <h1>Top Rated Movies</h1>
            </Header>
          </div>
        </div>

        <div className="row mt-4">
          <MyNav link={link} />
        </div>

        <div className=" mt-4 top-rated-cards-wrapper row row-cols-2 row-cols-md-3 row-cols-lg-4  row-gap-5">
          {getDataRandom?.map((data) => (
            <div className="col d-flex justify-content-center" key={data.id}>
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
                  handleShowModal={handleShowModal}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedSection;
