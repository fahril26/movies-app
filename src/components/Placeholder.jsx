/* eslint-disable react/prop-types */
import { Placeholder } from "react-bootstrap";

export default function AnimationExample({ size, style, totalItems }) {
  const items = Array.from({ length: totalItems }, (_, index) => index);

  return (
    <>
      <Placeholder
        as="ul"
        animation="glow"
        className={"d-flex gap-4 flex-column"}
      >
        {items.map((item) => (
          <Placeholder key={item} as={"li"} size={size} style={style} />
        ))}
      </Placeholder>
    </>
  );
}
