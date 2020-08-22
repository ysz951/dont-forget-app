import React from 'react';
import ReactDOM from 'react-dom';
import CategoryLink from './CategoryLink';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <CategoryLink />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
});