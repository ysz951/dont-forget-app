import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faDrumstickBite, faBars, faSearch, faCommentDots, faStar, faUser, 
faArrowUp, faSignInAlt, faSignOutAlt, faUserEdit, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { RecipeListProvider } from './context/RecipeListContext';
import { RecipeProvider } from './context/RecipeContext';
import { CollectionListProvider } from './context/CollectionListContext';
library.add(
  faDrumstickBite,
  faBars,
  faSearch,
  faCommentDots,
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
    <CollectionListProvider>
      <RecipeListProvider>
        <RecipeProvider>
          <App />
        </RecipeProvider>
      </RecipeListProvider>
    </CollectionListProvider> 
  </BrowserRouter>,
  document.getElementById('root')
);


