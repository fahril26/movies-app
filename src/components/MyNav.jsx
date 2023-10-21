/* eslint-disable react/prop-types */
import { Nav } from "react-bootstrap";
import "../style/MyNav.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const MyNav = ({ link, className, children, width }) => {
  const navigate = useNavigate();

  const resetLocalStorage = () => {
    localStorage.setItem("currentPage", 1);
    localStorage.setItem("paginationNumbers", JSON.stringify([1, 2, 3, 4, 5]));

    if (link) navigate(link);
  };

  return (
    <Nav className="my-nav" defaultActiveKey="/home">
      <Nav.Item style={width} className={className}>
        <NavLink
          to={link ? link : null}
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
