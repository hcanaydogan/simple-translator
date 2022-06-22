import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

window.logStyle = (color) => 'font-size: 14px; padding: 3px; border-radius: 5px; color: white; background-color: ' + color;
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <App />
  </>
);
