import React from 'react';
import ReactDOM from 'react-dom';
import SearchNav from './SearchNav';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SearchNav />
    </BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div)
})