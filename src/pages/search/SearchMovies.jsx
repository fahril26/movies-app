import { useContext } from "react";
import ListGroupSearch from "../../components/ListGroupSearch";
import MyPagination from "../../components/MyPagination";
import useFetch from "../../hook/useFetch";
import { CurrentPage } from "../../context/CurrentPageContext";
import { useState } from "react";
import AnimatedProgressBar from "../../components/AnimatedProgressBar";
import { KeywordContext } from "../../context/KeywordSearchContex";

export default function SearchMovies() {
  const { keywordSearch } = useContext(KeywordContext);
  const { currentPage, setCurrentPage } = useContext(CurrentPage);

  const { data, loadingPersentage, showPersentageBar, error } = useFetch(
    `https://api.themoviedb.org/3/search/movie?query=${keywordSearch}&include_adult=false&language=en-US&page=${currentPage}`
  );

  const [pageNumbers, setPageNumbers] = useState(
    JSON.parse(localStorage.getItem("paginationNumbers"))
  );

  return (
    <>
      {showPersentageBar ? (
        <AnimatedProgressBar width={loadingPersentage} />
      ) : null}

      <div className="movies-search-list">
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
          <div style={{ fontSize: "1.3rem" }}>No Have Data</div>
        )}

        {data?.total_pages > 1 ? (
          <MyPagination
            totalPage={data?.total_pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pageNumbers={pageNumbers}
            setPageNumbers={setPageNumbers}
            loading={showPersentageBar}
          />
        ) : null}
      </div>
    </>
  );
}
