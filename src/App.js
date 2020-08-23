import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import CurListsPage from './CurListsPage/CurListsPage';
import Header from './Header/Header';
import BuyItemList from './BuyItemList/BuyItemList';
import ShoppingPage from './ShoppingPage/ShoppingPage';
import NextListsPage from './NextListsPage/NextListsPage';
import LandingPage from './LandingPage/LandingPage';

import './App.css';
class App extends Component {
  render(){
    return (
      <div className='App'>
        <header className='App__header'>
          <Switch>
            <Route
              exact
              path={'/'}
              component={BlankPage}
            />
            <Route 
              component={Header}
            />
          </Switch>
        </header>
        <main className='App__main'>
          <Switch>
            <Route 
              exact
              path={'/'}
              component={LandingPage}
            />
            <Route
              exact
              path={'/buyList'}
              component={CurListsPage}
            />
            <Route
              exact
              path={'/nextList'}
              component={NextListsPage}
            />
            <Route
              path='/buyList/:listId'
              render={(routerProps) => 
                <BuyItemList
                  listId={routerProps.match.params.listId} 
                  history={routerProps.history}
                  key = {routerProps.match.params.listId}
                />
              }
            />
            <Route
              path='/shopping/:listId'
              render={(routerProps) => 
                <ShoppingPage
                  listId={routerProps.match.params.listId} 
                  history={routerProps.history}
                  key = {routerProps.match.params.listId}
                />
              }
            />
             <Route
              component={NotFoundPage}
            />  
          </Switch>
        </main>
      </div>
    );
  }
}

export default withRouter(App);

function BlankPage(){
  return <div></div>
}