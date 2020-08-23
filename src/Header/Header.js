import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import './Header.css';

class Header extends Component {
  render() {
    return (
      <nav className='Header__name'>
        <h1 className="Header_app_name">
          <NavLink exact to='/buyList'>
            Buy List
          </NavLink>
          {' '}
          <NavLink exact to='/nextList'>
            Next Time List
          </NavLink>
        </h1>
        
      </nav>
    );
  }
}

export default withRouter(Header);