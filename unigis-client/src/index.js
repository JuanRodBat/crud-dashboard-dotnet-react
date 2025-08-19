import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

function Root() {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // mantener el tema al recargar guardando en localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return <App theme={theme} setTheme={setTheme} />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);

