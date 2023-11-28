import { useContext } from "react";
import ListGroupSearch from "../../components/ListGroupSearch";
import MyPagination from "../../components/MyPagination";
import useFetch from "../../hook/useFetch";
import { useState } from "react";
import AnimatedProgressBar from "../../components/AnimatedProgressBar";
import { KeywordContext } from "../../context/KeywordSearchContex";
import { ResizeContext } from "../../context/WindowWidthContext";

export default function SearchMovies() {
  const { keywordSearch } = useContext(KeywordContext);
  const windowWidth = useContext(ResizeContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, loadingPersentage, showPersentageBar, error } = useFetch(
    `https://api.themoviedb.org/3/search/movie?query=${keywordSearch}&include_adult=false&language=en-US&page=${currentPage}`
  );

  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);

  const params = new URLSearchParams(location.search);
  const navigatePath = `/movies/search?query=${params.get("query")}`;

  return (
    <>
      {showPersentageBar ? (
        <AnimatedProgressBar width={loadingPersentage} />
      ) : null}

      <div
        className="movies-search-list"
        style={
          !data || (data.results.length <= 5 && windowWidth < 768)
            ? { height: "100vh" }
            : {}
        }
      >
        {data?.results?.length !== 0 && !error ? (
          <ul className=" d-flex flex-column gap-3 ">
            {data?.results.map((item) => (
              <li key={item.id}>
                <ListGroupSearch
                  poster={item.poster_path}
                  title={item.title}
                  releaseDate={item.release_date}
                  overview={item.overview}
                  type={"movie"}
                  id={item.id}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div
            style={{ fontSize: "1.3rem" }}
          >{`Not Found : "${keywordSearch}"`}</div>
        )}

        {data?.total_pages > 1 ? (
          <MyPagination
            totalPage={data?.total_pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumbers={pageNumbers}
            setPageNumbers={setPageNumbers}
            loading={showPersentageBar}
            navigatePath={navigatePath}
          />
        ) : null}
      </div>
    </>
  );
}
