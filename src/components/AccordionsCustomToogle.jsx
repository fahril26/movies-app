/* eslint-disable react/prop-types */
import { Accordion, useAccordionButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function CustomToggle({ children, eventKey }) {
  const decoratedOnClick = useAccordionButton(eventKey, () =>
    console.log("totally custom!")
  );

  return <NavLink onClick={decoratedOnClick}>{children}</NavLink>;
}

function AccordionsCustomToogle({ children }) {
  return (
    <Accordion>
      <div>
        <CustomToggle eventKey="0">{children}</CustomToggle>

        <Accordion.Collapse as={"ul"} eventKey="0" style={{ marginBottom: 0 }}>
          <ul>
            <li>
              <Link>Popular</Link>
            </li>
            <li>
              <Link>Top Rated</Link>
            </li>
            <li>
              <Link>Now Playing</Link>
            </li>
            <li>
              <Link>Upcoming</Link>
            </li>
          </ul>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
}

export default AccordionsCustomToogle;
