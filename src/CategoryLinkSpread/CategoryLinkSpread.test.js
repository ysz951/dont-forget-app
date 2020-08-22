import React from 'react';
import ReactDOM from 'react-dom';
import CategoryLinkSpread from './CategoryLinkSpread';
import { BrowserRouter } from 'react-router-dom';
it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <BrowserRouter>
        <CategoryLinkSpread />
    </BrowserRouter>, div)
  ReactDOM.unmountComponentAtNode(div)
});