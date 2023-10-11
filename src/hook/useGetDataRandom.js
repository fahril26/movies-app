import { useEffect } from "react";
import { useState } from "react";

const useGetDataRandom = (dataReceived, cardsLength) => {
  const [data, setData] = useState(null);

  const getDataRandom = () => {
    if (dataReceived && dataReceived?.results?.length > 0) {
      const randomIndexes = [];
      let randomIndex = null;

      // eslint-disable-next-line no-unused-vars
      for (const index of dataReceived.results) {
        randomIndex = Math.floor(Math.random() * dataReceived?.results?.length);

        if (
          !randomIndexes.includes(dataReceived?.results[randomIndex]) &&
          randomIndexes.length < cardsLength
        ) {
          randomIndexes.push(dataReceived?.results[randomIndex]);
        }
      }

      setData(randomIndexes);
    }
  };

  useEffect(() => {
    getDataRandom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataReceived, cardsLength]);

  return data;
};

export default useGetDataRandom;
