import { Route } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import ErrorElement from "../ErrorElement";
import WindowWidthContext from "../context/WindowWidthContext";
import { UpcomingList } from "../pages/all-list/movies/UpcomingList";
import TopRatedList from "../pages/all-list/movies/TopRatedList";
import BestTvSeriesList from "../pages/all-list/BestTvSeriesList";
import MovieDetail from "../pages/detail/MovieDetail";
import TvSeriesDetail from "../pages/detail/TvSeriesDetail";
import Seasons from "../pages/all-list/Seasons";
import Episode from "../pages/all-list/Episode";
import PopularMovieList from "../pages/all-list/movies/PopularMovieList";
import NowPlayingList from "../pages/all-list/movies/NowPlayingList";
import CurrentPageContext from "../context/CurrentPageContext";

export const RoutersRoot = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<ErrorElement />}>
        <Route index element={<Home />} />
        <Route
          path="/movies/upcoming/:page"
          element={
            <CurrentPageContext>
              <UpcomingList />
            </CurrentPageContext>
          }
        />
        <Route
          path="/movies/top-rated/:page"
          element={
            <CurrentPageContext>
              <TopRatedList />
            </CurrentPageContext>
          }
        />
        <Route
          path="/tv/best-tv-series/:page"
          element={
            <CurrentPageContext>
              <BestTvSeriesList />
            </CurrentPageContext>
          }
        />
        <Route path="/movie-detail/:movie_id" element={<MovieDetail />} />
        <Route path="/tv-series-detail/:tv_id" element={<TvSeriesDetail />} />
        <Route path="/tv-series-detail/:tv_id/seasons" element={<Seasons />} />
        <Route
          path="/tv-series-detail/:tv_id/seasons/:index"
          element={<Episode />}
        />
        <Route
          path="/movies/popular/:page"
          element={
            <CurrentPageContext>
              <PopularMovieList />
            </CurrentPageContext>
          }
        />
        <Route
          path="/movies/now-playing/:page"
          element={
            <CurrentPageContext>
              <NowPlayingList />
            </CurrentPageContext>
          }
        />
      </Route>
    )
  );

  return (
    <WindowWidthContext>
      <RouterProvider router={router} />
    </WindowWidthContext>
  );
};
