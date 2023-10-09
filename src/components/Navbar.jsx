import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { NavLink } from "react-router-dom";

import "../style/MyNavbar.css";
import { useContext } from "react";
import { ResizeContext } from "../context/WindowWidthContext";

// eslint-disable-next-line react/prop-types
function MyNavbar({ fixed }) {
  const windowWidth = useContext(ResizeContext);

  return (
    <>
      <Navbar expand={"lg"} className={`mb-3 bg-dark`} fixed={fixed && fixed}>
        <Container fluid>
          <Navbar.Brand href="#" className="fw-semibold fs-2 text-light">
            Popoflix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="end"
          >
            <Offcanvas.Header closeButton className="text-bg-dark">
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Popoflix
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={windowWidth < 992 ? "bg-dark" : null}>
              <Nav className="justify-content-center align-items-center  flex-grow-1 ps-lg-5  gap-4 ">
                <NavLink to={"/"}>Home</NavLink>
                <NavLink to={"/movies"}>Movies</NavLink>
                <NavLink to={"/tv-show"}>Tv Show</NavLink>
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
