import { createContext } from "react";
import useFetch from "../hook/useFetch";
import { useState } from "react";

export const DataContext = createContext();

const FetchDataContex = ({ children }) => {
  const [url, setUrl] = useState("");
  const { data, loading } = useFetch(url);

  const handleChangeUrl = (url) => {
    setUrl(url);
  };

  return (
    <DataContext.Provider value={{ data, loading, handleChangeUrl }}>
      {children}
    </DataContext.Provider>
  );
};

export default FetchDataContex;
