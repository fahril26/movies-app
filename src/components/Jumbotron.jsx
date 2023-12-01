import "../style/Jumbotron.css";

const Jumbotron = () => {
  return (
    <div className="jumbotron jumbotron-fluid">
      <div className="jumbotron-content d-flex justify-content-center flex-column row">
        <div className="col-7">
          <h5 className="fw-semibold fs-4 ">Popoflix</h5>
          <h1 className="display-5 fw-bold">
            Streaming <span>Movie</span>, TVs Shows, & More.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
