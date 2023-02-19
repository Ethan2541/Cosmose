import React from 'react';
import ReactDOM from 'react-dom/client';
import Entete from './Entete.js';
import Inscription from './Inscription.js';
import Connexion from './Connexion.js';

import './styles/index.css';
import './styles/fonts.css';
import MainPage from './MainPage.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='main'>
    <MainPage />
  </div>
);
