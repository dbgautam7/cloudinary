import "./App.css";
import React, { useState } from "react";
import RoutesHandler from "./components/routesHandler";
import { ThemeContext, themes } from "./components/context/themeContext";

const App = () => {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    theme === themes.light ? setTheme(themes.dark) : setTheme(themes.light);
  };

  const inlineStyles = {
    container: {
      backgroundColor: theme === themes.light ? "lightblue" : "black",
    },
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <div className="App" style={inlineStyles.container}>
        <RoutesHandler />
      </div>
    </ThemeContext.Provider>
  );
};
export default App;
