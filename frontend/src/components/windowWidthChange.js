import ColorContext from "./context/colorContext";
import "./styles.css";
import { useEffect, useState, useContext } from "react";

export default function App() {
  const setWindowsDimensions = () => {
    const width = window.innerWidth;
    return width;
  };

  const useWindowsDimensions = () => {
    const [width, setWidth] = useState(setWindowsDimensions());

    const handleResize = () => {
      setWidth(setWindowsDimensions());
    };

    useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    });

    return width;
  };
  const width = useWindowsDimensions();

  return (
    <div className="App">
      <h1>Changing the width of the window while scrolling</h1>
      <h2>{width}</h2>
    </div>
  );
}
