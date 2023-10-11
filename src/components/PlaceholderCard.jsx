import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";

const PlaceholderCard = () => {
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "16rem", margin: "auto" }}>
        <Card.Img
          style={{ width: 200 }}
          src={`https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg`}
        />
        <Card.Body>
          <Placeholder as={Card.Title} animation="glow">
            <Placeholder xs={6} />
          </Placeholder>
          <Placeholder as={Card.Text} animation="glow">
            <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />
            <Placeholder xs={6} /> <Placeholder xs={8} />
          </Placeholder>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PlaceholderCard;
