import "../style/Header.css";

// eslint-disable-next-line react/prop-types
const Header = ({ children, className }) => {
  return (
    <div className={className}>
      <header>{children}</header>
    </div>
  );
};

export default Header;
