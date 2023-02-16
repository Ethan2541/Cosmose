import React from 'react';
import ReactDOM from 'react-dom/client';
import MainPage from './MainPage.js';
import './style/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className='main'>
    <MainPage pageCourante="signup_page" isConnected={true}/>
  </div>
);
