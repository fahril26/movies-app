import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";
import "../style/MyNavbar.css";
import { useContext } from "react";
import { ResizeContext } from "../context/WindowWidthContext";
import { Dropdown } from "react-bootstrap";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import { useState } from "react";
import { Link } from "react-router-dom";
import AccordionsCustomToogle from "./AccordionsCustomToogle";
import { CurrentPage } from "../context/CurrentPageContext";

// eslint-disable-next-line react/prop-types
function MyNavbar({ fixed, style }) {
  const windowWidth = useContext(ResizeContext);

  const [showDropdown, setShowDropdown] = useState({
    movie: false,
    tvSeries: false,
  });

  const { setCurrentPage } = useContext(CurrentPage);

  const handleMouseEnter = (e) => {
    const newData = { ...showDropdown };

    if (e.target.classList.contains("movies")) {
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
  };

  return (
    <>
      <Navbar
        expand={"lg"}
        className={`mb-3 bg-dark`}
        fixed={fixed && fixed}
        style={style}
      >
        <Container fluid>
          <Navbar.Brand href="#" className="fw-semibold fs-2 text-light">
            Popoflix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
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
            <Offcanvas.Body className={windowWidth < 992 ? "bg-dark" : null}>
              <Nav className="justify-content-center align-items-start  flex-grow-1 ps-lg-5  gap-4 ">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink
                  className={"movies"}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Movies
                  <DropdownMenu show={showDropdown.movie}>
                    <Link
                      to={"/movies/popular/1"}
                      className="dropdown-item"
                      onClick={resetStorage}
                    >
                      Popular
                    </Link>
                    <Link
                      to={"/movies/top-rated/1"}
                      className="dropdown-item"
                      onClick={resetStorage}
                    >
                      Top Rated
                    </Link>
                    <Link
                      to={"/movies/now-playing/1"}
                      className="dropdown-item"
                      onClick={resetStorage}
                    >
                      Now Playing
                    </Link>
                    <Link
                      to={"/movies/upcoming/1"}
                      className="dropdown-item"
                      onClick={resetStorage}
                    >
                      Upcoming
                    </Link>
                  </DropdownMenu>
                </NavLink>

                <NavLink
                  to={"/tv-show"}
                  className={"tv-series"}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  Tv Show
                  <DropdownMenu show={showDropdown.tvSeries}>
                    <Dropdown.Item href="#/action-1">Popular</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Top Rated</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">
                      Airing Today
                    </Dropdown.Item>
                    <Dropdown.Item href="#/action-2">On Tv</Dropdown.Item>
                  </DropdownMenu>
                </NavLink>
                <NavLink to={"/blog"}>Blog</NavLink>
                <NavLink to={"/contact"}>Contact</NavLink>
              </Nav>

              {windowWidth >= 992 ? (
                <div className="d-flex justify-content-center align-items-center extra-navbar me-5">
                  <div className="search-box">
                    <button className="btn-search">
                      <i className="bi bi-search"></i>
                    </button>
                    <input
                      type="text"
                      className="input-search"
                      placeholder="Type to Search..."
                    />
                  </div>
                </div>
              ) : null}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavbar;
