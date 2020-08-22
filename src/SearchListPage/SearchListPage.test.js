import React from 'react';
import ReactDOM from 'react-dom';
import SearchListPage from './SearchListPage';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
        <SearchListPage />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
});