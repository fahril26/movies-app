/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useRef } from "react";
import { Accordion, useAccordionButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

function CustomToggle({ children, eventKey, setRotate, rotate, linkRef }) {
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
      ref={linkRef}
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
  const linkRef = useRef(null);

  useEffect(() => {
    linkRef.current.classList.remove("active");
  }, []);

  return (
    <Accordion>
      <>
        <CustomToggle
          eventKey={eventKey}
          setRotate={setRotate}
          rotate={rotate}
          resetStorage={resetStorage}
          linkRef={linkRef}
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
      </>
    </Accordion>
  );
}

export default AccordionsCustomToogle;
