/* eslint-disable react/prop-types */
import { Nav, NavLink } from "react-bootstrap";
import "../style/MyNav.css";

const MyNav = ({ link, className, children, width }) => {
  const resetLocalStorage = () => {
    localStorage.setItem("currentPage", 1);
    localStorage.setItem("paginationNumbers", JSON.stringify([1, 2, 3, 4, 5]));
  };

  return (
    <Nav className="my-nav" defaultActiveKey="/home">
      <Nav.Item style={width} className={className}>
        <NavLink
          href={link ? link : null}
          className="fw-semibold"
          onClick={resetLocalStorage}
        >
          {children ? children : " See All"}
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};

export default MyNav;
