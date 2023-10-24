/* eslint-disable react/prop-types */
import { Accordion, useAccordionButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function CustomToggle({ children, eventKey, setRotate, rotate }) {
  const decoratedOnClick = useAccordionButton(eventKey, () => {
    const newTriggerRotate = rotate.slice();
    newTriggerRotate[eventKey] = !rotate[eventKey];

    setRotate(newTriggerRotate);
  });

  return (
    <NavLink
      onClick={(e) => {
        e.preventDefault();
        decoratedOnClick();
      }}
    >
      {children}
    </NavLink>
  );
}

function AccordionsCustomToogle({
  children,
  setRotate,
  rotate,
  list,
  eventKey,
  resetStorage,
}) {
  return (
    <Accordion>
      <div>
        <CustomToggle
          eventKey={eventKey}
          setRotate={setRotate}
          rotate={rotate}
          resetStorage={resetStorage}
        >
          {children}
        </CustomToggle>

        <Accordion.Collapse
          as={"ul"}
          eventKey={eventKey}
          style={{ marginBottom: 0 }}
        >
          <>
            {list.map((item) => (
              <li key={item.name}>
                <Link to={item.link} onClick={resetStorage}>
                  {item.name}
                </Link>
              </li>
            ))}
          </>
        </Accordion.Collapse>
      </div>
    </Accordion>
  );
}

export default AccordionsCustomToogle;
