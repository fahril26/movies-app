import { useState } from "react";
import { createContext } from "react";

export const CurrentPage = createContext();

// eslint-disable-next-line react/prop-types
const CurrentPageContext = ({ children }) => {
  const getCurrentPageFromUrl = location.pathname.split("/");
  const currentPageFromUrl =
    getCurrentPageFromUrl[getCurrentPageFromUrl.length - 1];

  const [currentPage, setCurrentPage] = useState(currentPageFromUrl);

  return (
    <CurrentPage.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </CurrentPage.Provider>
  );
};

export default CurrentPageContext;
