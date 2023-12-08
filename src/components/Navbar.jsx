/* eslint-disable react/prop-types */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink, useNavigate, useLocation, Link } from "react-router-dom";
import "../style/MyNavbar.css";
import { ResizeContext } from "../context/WindowWidthContext";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import AccordionsCustomToogle from "./AccordionsCustomToogle";
import { CurrentPage } from "../context/CurrentPageContext";
import { useEffect, useState, useContext } from "react";
import { KeywordContext } from "../context/KeywordSearchContex";
import { CloseButton, Form } from "react-bootstrap";

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
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeNav, setActiveNav] = useState({ typePage: "", page: "" });
  const [showDropdown, setShowDropdown] = useState({
    movie: false,
    tvSeries: false,
  });
  const [accordionDefaultActiveKey, setAccordionDefaultActiveKey] =
    useState(null);

  const { setKeywordSearch } = useContext(KeywordContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  const setAccordionActive = () => {
    let newRotateArrow = [...rotateArrow];
    let defaultActiveKey = null;

    if (pathname.includes("movie")) {
      defaultActiveKey = 0;
      newRotateArrow[0] = true;
      newRotateArrow[1] = false;
      setAccordionDefaultActiveKey(defaultActiveKey);
      setRotateArrow(newRotateArrow);
    } else if (pathname.includes("tv")) {
      defaultActiveKey = 1;
      newRotateArrow[1] = true;
      newRotateArrow[0] = false;
      setAccordionDefaultActiveKey(defaultActiveKey);
      setRotateArrow(newRotateArrow);
    } else {
      for (const index in newRotateArrow) {
        newRotateArrow[index] = false;
      }
      setRotateArrow(newRotateArrow);
    }
  };

  const handleSubmit = () => {
    const params = new URLSearchParams();
    params.append("query", inputValue);

    setKeywordSearch(inputValue);
    navigate(`/movies/search?${params.toString()}`);
    localStorage.setItem("paginationNumbers", JSON.stringify([1, 2, 3, 4, 5]));
    localStorage.setItem("keywordSearch", inputValue);
  };

  const handleKeywordChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClearKeyword = () => {
    setInputValue("");
  };

  const getAnActivePage = () => {
    const typePage = pathname.split("/")[1];
    const page = pathname.split("/")[2];
    const newData = { ...activeNav, typePage, page };
    setActiveNav(newData);
  };

  const hideOffcanvas = () => {
    setShowOffcanvas(false);
  };

  useEffect(() => {
    if (windowWidth < 992) setAccordionActive();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accordionDefaultActiveKey, showOffcanvas]);

  useEffect(() => {
    getAnActivePage();
    // eslint-disable-next-line react-hooks/exhaustive-deps

    const handleHideOffcanvas = (e) => {
      if (e.target.classList.contains("offcanvas-backdrop")) hideOffcanvas();
    };

    window.addEventListener("click", handleHideOffcanvas);

    return () => window.removeEventListener("click", handleClearKeyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (windowWidth > 992) hideOffcanvas();
  }, [windowWidth]);

  return (
    <>
      <Navbar
        expand={"lg"}
        className={`bg-dark`}
        fixed={fixed && fixed}
        style={style}
      >
        <Container fluid>
          {showInputSearch && windowWidth < 992 ? (
            <InputSearchSmallScreen
              setShowInputSearch={setShowInputSearch}
              onSubmit={handleSubmit}
              handleClearKeyword={handleClearKeyword}
              handleKeywordChange={handleKeywordChange}
              inputValue={inputValue}
            />
          ) : (
            <>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-lg`}
                onClick={() => setShowOffcanvas(true)}
              />
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
                show={showOffcanvas}
              >
                <Offcanvas.Header className="text-bg-dark">
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                    Popoflix
                  </Offcanvas.Title>

                  <CloseButton onClick={() => setShowOffcanvas(false)} />
                </Offcanvas.Header>
                <Offcanvas.Body
                  className={`${
                    windowWidth < 992 ? " bg-hover" : null
                  } bg-dark`}
                >
                  <Nav
                    className="justify-content-center align-items-start  flex-grow-1   gap-4 "
                    as={"ul"}
                  >
                    <li style={{ width: windowWidth < 992 ? "100%" : null }}>
                      <NavLink to={"/"} className={`nav-link`}>
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
                        defaultActiveKey={accordionDefaultActiveKey}
                        activeNav={activeNav}
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
                                className={`dropdown-item ${
                                  link.path.includes(activeNav.typePage) &&
                                  link.path.includes(activeNav.page)
                                    ? "active"
                                    : ""
                                }`}
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
                        defaultActiveKey={accordionDefaultActiveKey}
                        activeNav={activeNav}
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
                              className={`dropdown-item ${
                                link.path.includes(activeNav.typePage) &&
                                link.path.includes(activeNav.page)
                                  ? "active"
                                  : ""
                              }`}
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
            </>
          )}
        </Container>

        {showInputSearch && windowWidth >= 992 && (
          <FormText
            handleClearKeyword={handleClearKeyword}
            handleKeywordChange={handleKeywordChange}
            inputValue={inputValue}
            handleSubmit={handleSubmit}
          />
        )}
      </Navbar>
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

function InputSearchSmallScreen({
  setShowInputSearch,
  onSubmit,
  handleClearKeyword,
  handleKeywordChange,
  inputValue,
}) {
  return (
    <Form
      className="container-fluid input-sm d-flex justify-content-around"
      onSubmit={(e) => {
        e.preventDefault();
        if (inputValue) onSubmit();
      }}
    >
      <input
        type="text"
        placeholder="Search..."
        onChange={handleKeywordChange}
        autoFocus
      />
      <div className="wrapper-search-btn d-flex align-items-center">
        <button className="search-btn">
          <i className="bi bi-search"></i>
        </button>
        <CloseButton
          onClick={() => {
            setShowInputSearch(false);
            handleClearKeyword();
          }}
        />
      </div>
    </Form>
  );
}

function FormText({
  handleSubmit,
  inputValue,
  handleKeywordChange,
  handleClearKeyword,
}) {
  return (
    <Form
      className="input-search d-flex align-items-center gap-1"
      onSubmit={(e) => {
        e.preventDefault();
        if (inputValue) handleSubmit();
      }}
    >
      <i className="bi bi-search"></i>
      <Form.Control
        type="text"
        id="inputKeyword"
        placeholder="Search for a movie or tv show"
        onChange={handleKeywordChange}
        value={inputValue}
        autoFocus
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
