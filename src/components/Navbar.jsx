/* eslint-disable react/prop-types */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import "../style/MyNavbar.css";
import { useContext } from "react";
import { ResizeContext } from "../context/WindowWidthContext";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { useState } from "react";
import AccordionsCustomToogle from "./AccordionsCustomToogle";
import { CurrentPage } from "../context/CurrentPageContext";
import { useEffect } from "react";
import { useRef } from "react";
import { Form } from "react-bootstrap";
import { KeywordContext } from "../context/KeywordSearchContex";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const movieLink = [
  { name: "Popular", path: "/movies/popular/1" },
  { name: "Top Rated", path: "/movies/top-rated/1" },
  { name: "Now Playing", path: "/movies/now-playing/1" },
  { name: "Upcoming", path: "/movies/upcoming/1" },
];

const tvSeriesLink = [
  { name: "Popular", path: "/tv/popular/1" },
  { name: "Top Rated", path: "/tv/top-rated/1" },
  { name: "Airing Today", path: "/tv/airing-today/1" },
  { name: "On Tv", path: "/tv/on-the-air/1" },
];

// eslint-disable-next-line react/prop-types
function MyNavbar({ fixed, style, setPageNumbers }) {
  const windowWidth = useContext(ResizeContext);
  const { setCurrentPage } = useContext(CurrentPage);
  const [rotateArrow, setRotateArrow] = useState([false, false]);
  const [showInputSearch, setShowInputSearch] = useState(false);

  const [accordionDefaultActiveKey, setAccordionDefaultActiveKey] =
    useState(null);
  const [showDropdown, setShowDropdown] = useState({
    movie: false,
    tvSeries: false,
  });

  const tvRef = useRef(null);
  const moviesRef = useRef(null);

  const handleMouseEnter = (e) => {
    const newData = { ...showDropdown };

    if (
      e.target.classList.contains("movies") ||
      e.target.classList.contains("dropdown-menu")
    ) {
      newData.movie = true;
      newData.tvSeries = false;
    } else if (e.target.classList.contains("tv-series")) {
      newData.tvSeries = true;
      newData.movie = false;
    }

    setShowDropdown(newData);
  };

  const handleMouseLeave = () => {
    const newData = { ...showDropdown };
    newData.movie = false;
    newData.tvSeries = false;

    setShowDropdown(newData);
  };

  const resetStorage = () => {
    setCurrentPage(1);
    localStorage.setItem("paginationNumbers", JSON.stringify([1, 2, 3, 4, 5]));

    if (setPageNumbers) {
      const paginationNumbers = JSON.parse(
        localStorage.getItem("paginationNumbers")
      );

      setPageNumbers(paginationNumbers);
    }
  };

  const setAccordionActive = (movies, tv) => {
    const navMoviesClassList = Array.from(movies.current.classList);
    const navTvClassList = Array.from(tv.current.classList);
    const classList = [navMoviesClassList, navTvClassList];
    let newRotateArrow = [...rotateArrow];
    let defaultActiveKey = null;

    for (const index in classList) {
      if (classList[index].includes("active")) {
        defaultActiveKey = Number(index);
        newRotateArrow[index] = true;
        setAccordionDefaultActiveKey(defaultActiveKey);
        setRotateArrow(newRotateArrow);
      } else {
        newRotateArrow[index] = false;
        setRotateArrow(newRotateArrow);
      }
    }
  };

  useEffect(() => {
    if (windowWidth < 992) setAccordionActive(moviesRef, tvRef);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accordionDefaultActiveKey]);

  return (
    <>
      <Navbar
        expand={"lg"}
        className={`bg-dark`}
        fixed={fixed && fixed}
        style={style}
      >
        <Container fluid>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Link to={"/"} className="fw-semibold fs-2 text-light">
            Popoflix
          </Link>
          {windowWidth < 992 && (
            <ButtonTriggerSearch
              show={showInputSearch}
              setShowInputSearch={setShowInputSearch}
              showInputSearch={showInputSearch}
            />
          )}

          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
          >
            <Offcanvas.Header closeButton className="text-bg-dark">
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Popoflix
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body
              className={windowWidth < 992 ? "bg-dark bg-hover" : null}
            >
              <Nav
                className="justify-content-center align-items-start  flex-grow-1   gap-4 "
                as={"ul"}
              >
                <li style={{ width: windowWidth < 992 ? "100%" : null }}>
                  <NavLink to={"/"} className={"nav-link"}>
                    Home
                  </NavLink>
                </li>

                {windowWidth < 992 ? (
                  <AccordionsCustomToogle
                    rotateArrow={rotateArrow}
                    setRotateArrow={setRotateArrow}
                    list={movieLink}
                    eventKey={0}
                    resetStorage={resetStorage}
                    moviesRef={moviesRef}
                    defaultActiveKey={accordionDefaultActiveKey}
                  >
                    Movies
                    <i
                      className={`bi bi-chevron-right ${
                        rotateArrow[0] ? "rotate" : ""
                      }`}
                    ></i>
                  </AccordionsCustomToogle>
                ) : (
                  <li
                    className={"movies"}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <NavLink
                      to={"/movies"}
                      className={"movies nav-link"}
                      onClick={(e) => e.preventDefault()}
                    >
                      Movies
                    </NavLink>

                    <DropdownMenu show={showDropdown.movie}>
                      {movieLink.map((link) => {
                        return (
                          <NavLink
                            key={link.name}
                            className={"dropdown-item"}
                            onClick={resetStorage}
                            to={link.path}
                          >
                            {link.name}
                          </NavLink>
                        );
                      })}
                    </DropdownMenu>
                  </li>
                )}

                {windowWidth < 992 ? (
                  <AccordionsCustomToogle
                    rotateArrow={rotateArrow}
                    setRotateArrow={setRotateArrow}
                    list={tvSeriesLink}
                    eventKey={1}
                    resetStorage={resetStorage}
                    tvRef={tvRef}
                    defaultActiveKey={accordionDefaultActiveKey}
                  >
                    Tv Show
                    <i
                      className={`bi bi-chevron-right ${
                        rotateArrow[1] ? "rotate" : ""
                      }`}
                    ></i>
                  </AccordionsCustomToogle>
                ) : (
                  <li
                    className={"tv-series"}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    style={{ width: windowWidth < 992 ? "100%" : null }}
                  >
                    <NavLink
                      className={"tv-series nav-link"}
                      to={"/tv"}
                      onClick={(e) => e.preventDefault()}
                    >
                      Tv Show
                    </NavLink>
                    <DropdownMenu show={showDropdown.tvSeries}>
                      {tvSeriesLink.map((link) => (
                        <NavLink
                          key={link.name}
                          className={"dropdown-item"}
                          onClick={resetStorage}
                          to={link.path}
                        >
                          {link.name}
                        </NavLink>
                      ))}
                    </DropdownMenu>
                  </li>
                )}

                <li style={{ width: windowWidth < 992 ? "100%" : null }}>
                  <NavLink to={"/blog"} className={"nav-link"}>
                    Blog
                  </NavLink>
                </li>
                <li style={{ width: windowWidth < 992 ? "100%" : null }}>
                  <NavLink to={"/contact"} className={"nav-link"}>
                    Contact
                  </NavLink>
                </li>
              </Nav>

              {windowWidth >= 992 && (
                <ButtonTriggerSearch
                  show={showInputSearch}
                  setShowInputSearch={setShowInputSearch}
                  showInputSearch={showInputSearch}
                />
              )}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      {showInputSearch && <FormText />}
    </>
  );
}

function ButtonTriggerSearch({ show, setShowInputSearch, showInputSearch }) {
  const handleShowInputSearch = () => {
    setShowInputSearch(!showInputSearch);
  };

  return (
    <button className="search-btn" onClick={handleShowInputSearch}>
      {show ? <i className="bi bi-x-lg"></i> : <i className="bi bi-search"></i>}
    </button>
  );
}

function FormText() {
  const { setKeywordSearch } = useContext(KeywordContext);
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();

  const handleKeywordChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    setKeywordSearch(inputValue);
    navigate("/search/movies/1");
    localStorage.setItem("paginationNumbers", JSON.stringify([1, 2, 3, 4, 5]));
    localStorage.setItem("keywordSearch", inputValue);
  };

  const handleClearKeyword = () => {
    setInputValue("");
  };

  return (
    <Form
      className="input-search d-flex align-items-center gap-1"
      onSubmit={handleSubmit}
    >
      <i className="bi bi-search"></i>
      <Form.Control
        type="text"
        id="inputKeyword"
        placeholder="Search for a movie or tv show"
        onChange={handleKeywordChange}
        value={inputValue}
      />

      {inputValue ? (
        <button
          className="close-btn"
          type="button"
          onClick={handleClearKeyword}
        >
          <i className="bi bi-x-lg"></i>
        </button>
      ) : null}
    </Form>
  );
}

export default MyNavbar;
