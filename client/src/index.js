import App from "./App.js";
import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import "./styles/index.css";
import "./styles/fonts.css";
import "./styles/themes.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <App pageCourante="accueil" statutConnexion={ false } />
  </BrowserRouter>
);
