import React from 'react';
import ReactDOM from 'react-dom';
import RecipeTitle from './RecipeTitle';
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RecipeTitle />, div)
  ReactDOM.unmountComponentAtNode(div)
});