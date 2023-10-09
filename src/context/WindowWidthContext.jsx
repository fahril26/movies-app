import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const ResizeContext = createContext();

// eslint-disable-next-line react/prop-types
const WindowWidthContext = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResizeWindow);

    return () => {
      window.removeEventListener("resize", handleResizeWindow);
    };
  }, []);
  return (
    <ResizeContext.Provider value={windowWidth}>
      {children}
    </ResizeContext.Provider>
  );
};

export default WindowWidthContext;
