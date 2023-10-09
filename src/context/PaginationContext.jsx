import { useState } from "react";
import { createContext } from "react";

export const MyPaginationContext = createContext();

// eslint-disable-next-line react/prop-types
const PaginationContext = ({ children }) => {
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);

  return (
    <MyPaginationContext.Provider value={{ pageNumbers, setPageNumbers }}>
      {children}
    </MyPaginationContext.Provider>
  );
};

export default PaginationContext;
