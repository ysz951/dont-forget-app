import React from 'react';
import ReactDOM from 'react-dom';
import CategoryListPage from './CategoryListPage';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <CategoryListPage />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
});