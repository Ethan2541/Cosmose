import App from "./App.js";
import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import "./styles/fonts.css";
import "./styles/themes.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div className='main'>
    <App pageCourante="accueil" statutConnexion={ false } />
  </div>
);
