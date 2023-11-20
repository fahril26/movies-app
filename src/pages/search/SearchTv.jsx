import { useContext } from "react";
import ListGroupSearch from "../../components/ListGroupSearch";

import useFetch from "../../hook/useFetch";
import { CurrentPage } from "../../context/CurrentPageContext";
import { useState } from "react";
import AnimatedProgressBar from "../../components/AnimatedProgressBar";
import MyPagination from "../../components/MyPagination";
import { KeywordContext } from "../../context/KeywordSearchContex";

const SearchTv = () => {
  const { keywordSearch } = useContext(KeywordContext);
  const { currentPage, setCurrentPage } = useContext(CurrentPage);

  const { data, loadingPersentage, showPersentageBar, error } = useFetch(
    `https://api.themoviedb.org/3/search/tv?query=${keywordSearch}&include_adult=false&language=en-US&page=${currentPage}`
  );

  const [pageNumbers, setPageNumbers] = useState(
    JSON.parse(localStorage.getItem("paginationNumbers"))
  );

  return (
    <>
      {showPersentageBar ? (
        <AnimatedProgressBar width={loadingPersentage} />
      ) : null}

      <div className="tv-search-list">
        {data?.results?.length !== 0 && !error ? (
          <ul className=" d-flex flex-column gap-3 ">
            {data?.results.map((item) => (
              <li key={item.id}>
                <ListGroupSearch
                  poster={item.poster_path}
                  title={item.name}
                  releaseDate={item.first_air_date}
                  overview={item.overview}
                  type={"tv"}
                  id={item.id}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div style={{ fontSize: "1.3rem" }}>No Have Data</div>
        )}

        {data?.total_page > 1 && (
          <MyPagination
            totalPage={data?.total_pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            loading={showPersentageBar}
            pageNumbers={pageNumbers}
            setPageNumbers={setPageNumbers}
          />
        )}
      </div>
    </>
  );
};

export default SearchTv;
