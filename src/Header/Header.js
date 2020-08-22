import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';
import CollectionListContext from '../context/CollectionListContext';
import './Header.css';

class Header extends Component {
  static contextType = CollectionListContext;
  handleLogoutClick = () => {
    this.context.clearCollectionList();
    TokenService.clearAuthToken();
    /* when logging out, clear the callbacks to the refresh api and idle auto logout */
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
  }

  renderLogoutLink() {
    return (
      <div className='Header__log_part'>
        <Link
          to='/users/collections'>
          <FontAwesomeIcon icon='star' />
          {' '}
          Favorite
        </Link>
        {' '}
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
            <FontAwesomeIcon icon='sign-in-alt' />
            {' '}
          Log out
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className='Header__log_part'>
        <Link
          to='/users/collections'>
          <FontAwesomeIcon icon='star' />
          {' '}
          Favorite
        </Link>
        {' '}
        <Link
          to='/login'>
            <FontAwesomeIcon icon='sign-out-alt' />
            {' '}
          Log in
        </Link>
      </div>
    );
  }
  render() {
    return (
      <nav className='Header__name'>
        <h1 className="Header_app_name">
          <Link to='/main'>
            <FontAwesomeIcon className="red" icon='drumstick-bite' />
            {' '}
            <span className="brown">Enjoy</span> <span className="orange">Cook</span>
          </Link>
        </h1>
        
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
        
      </nav>
    );
  }
}

export default withRouter(Header);