import { ProgressBar } from "react-bootstrap";
import "../style/ProgressBar.css";

// eslint-disable-next-line react/prop-types
const AnimatedProgressBar = ({ width }) => {
  return (
    <div className="progress-bar-wrapper">
      <ProgressBar now={width} max={100} className="bg-dark" />
    </div>
  );
};

export default AnimatedProgressBar;
