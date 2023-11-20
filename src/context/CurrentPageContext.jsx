import { useState } from "react";
import { createContext } from "react";
import { useParams } from "react-router-dom";

export const CurrentPage = createContext();

// eslint-disable-next-line react/prop-types
const CurrentPageContext = ({ children }) => {
  const { page } = useParams();

  const [currentPage, setCurrentPage] = useState(Number(page));

  return (
    <CurrentPage.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPage.Provider>
  );
};

export default CurrentPageContext;
