import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSearch, faStar, faUser, 
faArrowUp, faSignInAlt, faSignOutAlt, faUserEdit, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {BuyListsProvider} from './context/BuyListsContext';
library.add(
  faBars,
  faSearch,
  faStar,
  faUser,
  faArrowUp,
  faSignInAlt,
  faSignOutAlt,
  faUserEdit,
  faEdit,
  faTrashAlt,
);
ReactDOM.render(
  <BrowserRouter>
    <BuyListsProvider>
      <App />
    </BuyListsProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


