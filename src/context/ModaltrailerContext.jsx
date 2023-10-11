import { createContext } from "react";
import { useState } from "react";

export const TrailerContext = createContext();

// eslint-disable-next-line react/prop-types
const ModaltrailerContext = ({ children }) => {
  const [modalShow, setModalShow] = useState(false);

  const handleShowModal = (e) => {
    e.preventDefault();

    setModalShow(true);
  };

  return (
    <TrailerContext.Provider
      value={{ modalShow, handleShowModal, setModalShow }}
    >
      {children}
    </TrailerContext.Provider>
  );
};

export default ModaltrailerContext;
