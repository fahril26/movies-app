import { useState } from "react";
import { createContext } from "react";

export const KeywordContext = createContext();

// eslint-disable-next-line react/prop-types
export default function KeywordSearchContex({ children }) {
  const [keywordSearch, setKeywordSearch] = useState(
    localStorage.getItem("keywordSearch")
  );

  return (
    <KeywordContext.Provider value={{ keywordSearch, setKeywordSearch }}>
      {children}
    </KeywordContext.Provider>
  );
}
