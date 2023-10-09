import { useEffect } from "react";
import { useState } from "react";

const useGetDataRandom = (dataSent, cardsLength) => {
  const [data, setData] = useState(null);

  const getDataRandom = () => {
    if (dataSent && dataSent?.results.length > 0) {
      const randomIndexes = [];
      let randomIndex = null;

      // eslint-disable-next-line no-unused-vars
      for (const index of dataSent.results) {
        randomIndex = Math.floor(Math.random() * dataSent.results.length);

        if (
          !randomIndexes.includes(dataSent.results[randomIndex]) &&
          randomIndexes.length < cardsLength
        ) {
          randomIndexes.push(dataSent.results[randomIndex]);
        }
      }

      setData(randomIndexes);
    }
  };

  useEffect(() => {
    getDataRandom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataSent, cardsLength]);

  return data;
};

export default useGetDataRandom;
