import { ProgressBar } from "react-bootstrap";

// eslint-disable-next-line react/prop-types
const AnimatedProgressBar = ({ width }) => {
  return <ProgressBar animated now={width} max={100} />;
};

export default AnimatedProgressBar;
