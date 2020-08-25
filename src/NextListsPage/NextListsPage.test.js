import React from 'react';
import ReactDOM from 'react-dom';
import NextListsPage from './NextListsPage';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <NextListsPage />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div)
})