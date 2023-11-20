import { RotatingLines } from "react-loader-spinner";
import "../style/Loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <RotatingLines
        strokeColor="#e4d804"
        strokeWidth="5"
        animationDuration="1"
        width="96"
        visible={true}
      />
    </div>
  );
}
