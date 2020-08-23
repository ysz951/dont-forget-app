import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import {BuyListsProvider} from './context/BuyListsContext';
ReactDOM.render(
  <BrowserRouter>
    <BuyListsProvider>
      <App />
    </BuyListsProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


