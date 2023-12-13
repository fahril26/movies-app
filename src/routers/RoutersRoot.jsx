import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "../pages/home/Home";
import ErrorElement from "../ErrorElement";
import WindowWidthContext from "../context/WindowWidthContext";
import { UpcomingList } from "../pages/movies/UpcomingList";
import TopRatedList from "../pages/movies/TopRatedList";
import MovieDetail from "../pages/detail/MovieDetail";
import TvSeriesDetail from "../pages/detail/TvSeriesDetail";
import Seasons from "../pages/tv-series/Seasons";
import Episode from "../pages/tv-series/Episode";
import PopularMovieList from "../pages/movies/PopularMovieList";
import NowPlayingList from "../pages/movies/NowPlayingList";
import CurrentPageContext from "../context/CurrentPageContext";
import PopularTvSeries from "../pages/tv-series/PopularTvSeries";
import { TopRatedSeries } from "../pages/tv-series/TopRatedSeries";
import OnTv from "../pages/tv-series/OnTv";
import AiringToday from "../pages/tv-series/AiringToday";
import { ScrollRestoration } from "react-router-dom";
import SearchPageLayout from "../pages/search/SearchPageLayout";
import SearchMovies from "../pages/search/SearchMovies";
import SearchTv from "../pages/search/SearchTv";
import KeywordSearchContex from "../context/KeywordSearchContex";
import Contact from "../pages/contact/Contact";

export const RoutersRoot = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route errorElement={<ErrorElement />} path="/">
        <Route element={<Home />} index />

        <Route
          path="/movies/upcoming/:page"
          element={
            <CurrentPageContext>
              <ScrollRestoration />
              <UpcomingList />
            </CurrentPageContext>
          }
        />

        <Route
          path="/movies/top-rated/:page"
          element={
            <CurrentPageContext>
              <ScrollRestoration />
              <TopRatedList />
            </CurrentPageContext>
          }
        />
        <Route
          path="/movie-detail/:movie_id"
          element={
            <>
              <ScrollRestoration />
              <MovieDetail />
            </>
          }
        />
        <Route
          path="/tv-series-detail/:tv_id"
          element={
            <>
              <ScrollRestoration />
              <TvSeriesDetail />
            </>
          }
        />
        <Route
          path="/tv-series-detail/:tv_id/seasons"
          element={
            <>
              <ScrollRestoration />
              <Seasons />
            </>
          }
        />
        <Route
          path="/tv-series-detail/:tv_id/seasons/:index"
          element={<Episode />}
        />
        <Route
          path="/movies/popular/:page"
          element={
            <CurrentPageContext>
              <ScrollRestoration />
              <PopularMovieList />
            </CurrentPageContext>
          }
        />
        <Route
          path="/movies/now-playing/:page"
          element={
            <CurrentPageContext>
              <ScrollRestoration />
              <NowPlayingList />
            </CurrentPageContext>
          }
        />

        <Route
          path="/tv/popular/:page"
          element={
            <CurrentPageContext>
              <ScrollRestoration />
              <PopularTvSeries />
            </CurrentPageContext>
          }
        />

        <Route
          path="/tv/top-rated/:page"
          element={
            <CurrentPageContext>
              <ScrollRestoration />
              <TopRatedSeries />
            </CurrentPageContext>
          }
        />

        <Route
          path="/tv/airing-today/:page"
          element={
            <CurrentPageContext>
              <ScrollRestoration />
              <AiringToday />
            </CurrentPageContext>
          }
        />

        <Route
          path="/tv/on-the-air/:page"
          element={
            <CurrentPageContext>
              <ScrollRestoration />
              <OnTv />
            </CurrentPageContext>
          }
        />

        <Route
          element={
            <CurrentPageContext>
              <ScrollRestoration />
              <SearchPageLayout />
            </CurrentPageContext>
          }
        >
          <Route
            path={"/movies/search"}
            index
            element={
              <CurrentPageContext>
                <SearchMovies />
              </CurrentPageContext>
            }
          />
          <Route
            path={"/tv/search"}
            element={
              <CurrentPageContext>
                <SearchTv />
              </CurrentPageContext>
            }
          />
        </Route>

        <Route
          path={"/contact"}
          element={
            <CurrentPageContext>
              <ScrollRestoration />
              <Contact />
            </CurrentPageContext>
          }
        />
      </Route>
    )
  );

  return (
    <WindowWidthContext>
      <KeywordSearchContex>
        <RouterProvider router={router} />
      </KeywordSearchContex>
    </WindowWidthContext>
  );
};
