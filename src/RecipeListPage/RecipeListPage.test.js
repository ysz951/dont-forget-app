import React from 'react';
import ReactDOM from 'react-dom';
import RecipeListPage from './RecipeListPage';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <RecipeListPage />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
});