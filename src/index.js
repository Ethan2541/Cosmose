import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import "./styles/fonts.css";
import "./styles/themes.css";

import UserPage from "./pages/UserPage.js";
import UserStatsWrapper from "./components/UserStats/UserStatsWrapper.js"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <div className='main'>
    <UserPage />
  </div>
);
