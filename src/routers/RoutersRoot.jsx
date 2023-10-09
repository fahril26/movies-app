import { Route } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import { createRoutesFromElements } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import ErrorElement from "../ErrorElement";
import WindowWidthContext from "../context/WindowWidthContext";
import { UpcomingList } from "../pages/all-list/UpcomingList";
import TopRatedList from "../pages/all-list/TopRatedList";
import BestTvSeriesList from "../pages/all-list/BestTvSeriesList";
import MovieDetail from "../pages/detail/MovieDetail";
import TvSeriesDetail from "../pages/detail/TvSeriesDetail";
import PaginationContext from "../context/PaginationContext";
import Seasons from "../pages/all-list/Seasons";
import Episode from "../pages/all-list/Episode";

export const RoutersRoot = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" errorElement={<ErrorElement />}>
        <Route index element={<Home />} />
        <Route
          path="https://movies-app-gamma-six.vercel.app/upcoming-list"
          element={
            <PaginationContext>
              <UpcomingList />
            </PaginationContext>
          }
        />
        <Route
          path="/top-rated-movies-list"
          element={
            <PaginationContext>
              <TopRatedList />
            </PaginationContext>
          }
        />
        <Route
          path="/best-tv-series-list"
          element={
            <PaginationContext>
              <BestTvSeriesList />
            </PaginationContext>
          }
        />
        <Route path="/movie-detail/:movie_id" element={<MovieDetail />} />
        <Route path="/tv-series-detail/:tv_id" element={<TvSeriesDetail />} />
        <Route path="/tv-series-detail/:tv_id/seasons" element={<Seasons />} />
        <Route
          path="/tv-series-detail/:tv_id/seasons/:index"
          element={<Episode />}
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
