import { useState } from "react";
import { useEffect } from "react";

const useSetCardTotals = ({ windowWidth, initialValue, newValue }) => {
  const [cardTotal, setCardTotal] = useState(initialValue);

  const handleCardTotals = () => {
    const newCardTotal =
      windowWidth > 992 || windowWidth < 768 ? initialValue : newValue;

    setCardTotal(newCardTotal);
  };

  useEffect(() => {
    handleCardTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  return cardTotal;
};

export default useSetCardTotals;
