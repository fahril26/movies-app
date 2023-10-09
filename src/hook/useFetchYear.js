import { useEffect } from "react";
import { useState } from "react";

const useFetchYear = (data) => {
  const [yearRelease, setYearRelease] = useState("");

  function fetchYear() {
    const newData = data?.slice(0, 4);

    setYearRelease(newData);
  }

  useEffect(() => {
    fetchYear();
  }, [data]);

  return yearRelease;
};

export default useFetchYear;
