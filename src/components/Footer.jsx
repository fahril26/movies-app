/* eslint-disable react/prop-types */
import { Nav } from "react-bootstrap";
import "../style/Footer.css";

const Footer = ({ className }) => {
  return (
    <footer className={`bg-dark pt-5 pb-3 ${className || ""}`}>
      <div className="container-fluid">
        <div className="row navigation align-items-center">
          <div className="quick-link-list col-12  col-md-6 px-0">
            <Nav
              defaultActiveKey="/home"
              as="ul"
              className="d-flex justify-content-center justify-content-md-start mb-3 mb-md-0"
            >
              <Nav.Item as="li">
                <Nav.Link href="/home">FAQ</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-1">HELP CENTER</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-2">TERMS OF USE</Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-3">PRIVACY</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>

          <div className="social-media-list col-12 col-md-6 p-0">
            <Nav
              defaultActiveKey="/home"
              as="ul"
              className="d-flex justify-content-center justify-content-md-end gap-1 gap-sm-3 "
            >
              <Nav.Item as="li">
                <Nav.Link href="/home">
                  <i className="fa-brands fa-facebook-f"></i>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-1">
                  <i className="fa-brands fa-twitter"></i>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link eventKey="link-2">
                  <i className="fa-brands fa-pinterest-p"></i>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li">
                <Nav.Link>
                  <i className="fa-brands fa-linkedin"></i>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>

        <div className="row justify-content-center text-center text-light mt-4">
          Copyright © 2023. All Rights Reserved By Fhrl
        </div>
      </div>
    </footer>
  );
};

export default Footer;
