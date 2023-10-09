import { useEffect, useState } from "react";
import Odometer from "react-odometerjs";
import "../style/MyOdometer.css";

// eslint-disable-next-line react/prop-types, no-unused-vars
const MyOdometer = ({ className, style }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timeoutId = setTimeout(() => setValue(20), 1000);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <Odometer value={value} style={{ display: "inline-block" }} />;
};

export default MyOdometer;
