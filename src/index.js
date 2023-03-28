import React from "react";
import ReactDOM from "react-dom/client";

import "./styles/index.css";
import "./styles/fonts.css";
import HubPrincipal from "./HubPrincipal.js";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='main'>
    <HubPrincipal pageCourante="accueil" statutConnexion={true} />
  </div>
);
