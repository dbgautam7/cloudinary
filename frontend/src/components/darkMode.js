import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./context/themeContext";
import { Button } from "antd";

const DarkMode = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        marginTop: "100px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link to="/">Back to Home</Link>
      <h3>My {theme} theme color</h3>
      {theme === "dark" ? (
        <Button onClick={toggleTheme} type="primary">
          Dark Button
        </Button>
      ) : (
        <Button onClick={toggleTheme}>Light Button</Button>
      )}
    </div>
  );
};

export default DarkMode;
