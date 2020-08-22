import React from 'react';
import ReactDOM from 'react-dom';
import CollectionListPage from './CollectionListPage';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CollectionListPage />, div)
  ReactDOM.unmountComponentAtNode(div)
});