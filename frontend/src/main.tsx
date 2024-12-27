import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import { Provider } from "react-redux";
//import { store, persistor } from "./store";
//import { PersistGate } from "redux-persist/integration/react";
import './tailwind.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
