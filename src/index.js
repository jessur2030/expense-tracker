import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./bootstrap.min (6).css";
import "./index.css";
import { BudgetsProvider } from "./contexts/BudgetsContext.js";

ReactDOM.render(
  <React.StrictMode>
    <BudgetsProvider>
      <App />
    </BudgetsProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
