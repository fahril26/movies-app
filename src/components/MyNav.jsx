/* eslint-disable react/prop-types */
import { Nav, NavLink } from "react-bootstrap";
import "../style/MyNav.css";


const MyNav = ({ link, className, children, width }) => {
  return (
    <Nav className="my-nav" defaultActiveKey="/home">
      <Nav.Item style={width} className={className}>
        <NavLink href={link ? link : null} className="fw-semibold">
          {children ? children : " See All"}
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};

export default MyNav;
