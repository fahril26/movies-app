import "../style/ImageLost.css";

// eslint-disable-next-line react/prop-types
const ImageLost = ({ width, handleClick }) => {
  return (
    <div className="bg-body-secondary image-lost">
      <img
        src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`}
        width={width}
        onClick={handleClick}
      />
    </div>
  );
};

export default ImageLost;
