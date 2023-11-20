/* eslint-disable react/prop-types */

import { Accordion, useAccordionButton } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function CustomToggle({
  children,
  eventKey,
  setRotateArrow,
  rotateArrow,
  moviesRef,
  tvRef,
}) {
  const pagePath = ["/movies", "/tv"];

  const decoratedOnClick = useAccordionButton(eventKey, () => {
    const newTriggershowAccor = rotateArrow.slice();
    newTriggershowAccor[eventKey] = !rotateArrow[eventKey];

    setRotateArrow(newTriggershowAccor);
  });

  return (
    <NavLink
      onClick={(e) => {
        e.preventDefault();
        decoratedOnClick();
      }}
      to={pagePath[eventKey]}
      className={"nav-link"}
      ref={eventKey === 0 ? moviesRef : tvRef}
    >
      {children}
    </NavLink>
  );
}

function AccordionsCustomToogle({
  children,
  list,
  eventKey,
  resetStorage,
  rotateArrow,
  setRotateArrow,
  moviesRef,
  tvRef,
  defaultActiveKey,
}) {
  const handleClick = () => {
    resetStorage();
  };

  return (
    <Accordion defaultActiveKey={defaultActiveKey}>
      <>
        <CustomToggle
          eventKey={eventKey}
          setRotateArrow={setRotateArrow}
          rotateArrow={rotateArrow}
          resetStorage={resetStorage}
          moviesRef={moviesRef}
          tvRef={tvRef}
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
                <NavLink
                  to={item.path}
                  onClick={() => handleClick(item)}
                  className={"nav-link"}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </>
        </Accordion.Collapse>
      </>
    </Accordion>
  );
}

export default AccordionsCustomToogle;
