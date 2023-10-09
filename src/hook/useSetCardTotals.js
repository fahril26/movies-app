import { useEffect } from "react";
import { useState } from "react";

const useSetCardTotals = ({ windowWidth, initialValue, newValue }) => {
  const [cardTotals, setCardTotals] = useState(initialValue);

  const handleCardTotals = () => {
    const cardTotal =
      windowWidth > 992 || windowWidth < 768 ? initialValue : newValue;

    setCardTotals(cardTotal);
  };

  useEffect(() => {
    handleCardTotals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  return cardTotals;
};

export default useSetCardTotals;
