import { ColorRing } from "react-loader-spinner";
import "../style/Loading.css";

export default function LoadingSearch() {
  return (
    <div className="loading-search">
      <ColorRing
        visible={true}
        height="125"
        width="125"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
}
