import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Header from './Header/Header';
import RecipeListPage from './RecipeListPage/RecipeListPage';
import RecipePage from './RecipePage/RecipePage';
import NotFoundPage from './NotFoundPage/NotFoundPage';
import LoginPage from './LoginPage/LoginPage';
import RegistrationPage from './RegistrationPage/RegistrationPage';
import CategoryListPage from './CategoryListPage/CategoryListPage';
import SearchListPage from './SearchListPage/SearchListPage';
import PublicOnlyRoute from './Route/PublicOnlyRoute';
import PrivateRoute from './Route/PrivateRoute';
import TokenService from './services/token-service';
import AuthApiService from './services/auth-api-service';
import IdleService from './services/idle-service';
import CollectionListContext  from './context/CollectionListContext';
import CollectionListPage from './CollectionListPage/CollectionListPage';
import LandingPage from './LandingPage/LandingPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './App.css';
class App extends Component {
  constructor(props) {
    super(props);
    this.state={ 
      hasError: false, 
      is_visible: false,
    };
  }
  // state = { hasError: false, is_visible:false }
  static contextType = CollectionListContext;
  static getDerivedStateFromError(error) {
    console.error(error);
    return { hasError: true }
  };
  componentDidUpdate(prevProps) {
    if (window.localStorage.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }
  onRouteChanged() {
    // store the previous location
    if (window.location.pathname !== '/login' ) window.localStorage.pathname = window.location.pathname;
  }

  toggleVisibility() {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true
      });
    } 
    else {
      this.setState({
        is_visible: false
      });
    }
  }
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  componentDidMount() {
    const scrollComponent = this;
    document.addEventListener("scroll", function(e) {
      scrollComponent.toggleVisibility();
    });
    // console.log(TokenService.hasAuthToken())
    /*
      set the function (callback) to call when a user goes idle
      we'll set this to logout a user when they're idle
    */
    IdleService.setIdleCallback(this.logoutFromIdle);

    /* if a user is logged in */
    if (TokenService.hasAuthToken()) {
      // this.forceUpdate()
      /*
        tell the idle service to register event listeners
        the event listeners are fired when a user does something, e.g. move their mouse
        if the user doesn't trigger one of these event listeners,
          the idleCallback (logout) will be invoked
      */
      IdleService.regiserIdleTimerResets();

      /*
        Tell the token service to read the JWT, looking at the exp value
        and queue a timeout just before the token expires
      */
      TokenService.queueCallbackBeforeExpiry(() => {
        /* the timoue will call this callback just before the token expires */
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    /*
      when the app unmounts,
      stop the event listeners that auto logout (clear the token from storage)
    */
    IdleService.unRegisterIdleResets();
    /*
      and remove the refresh endpoint request
    */
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    this.context.clearCollectionList();
    /* remove the token from localStorage */
    TokenService.clearAuthToken();
    /* remove any queued calls to the refresh endpoint */
    TokenService.clearCallbackBeforeExpiry();
    /* remove the timeouts that auto logout when idle */
    IdleService.unRegisterIdleResets();
    /*
      react won't know the token has been removed from local storage,
      so we need to tell React to rerender
    */
    this.forceUpdate();
  }
  render(){
    return (
      <div className='App'>
        {this.state.is_visible && (
          <button className="goTop-btn" onClick={this.scrollToTop}>
             <FontAwesomeIcon className="goTop-icon" icon="arrow-up"/>
          </button>
        )}
        <header className='App__header'>
          <Header />
        </header>
        <main className='App__main'>
          <Switch>
            <PublicOnlyRoute
              exact
              path={'/'}
              component={LandingPage}
            />
          {/* <Route
              exact
              path={'/'}
              render={(routerProps) => 
                <LandingPage
                  history={routerProps.history}
                />
              }
            /> */}
            <Route
              exact
              path={'/main'}
              render={(routerProps) => 
                <RecipeListPage
                  history={routerProps.history}
                  location={routerProps.location}
                />
              }
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginPage}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationPage}
            />
            <PrivateRoute
              path={'/users/collections'}
              component={CollectionListPage}
            />
            <Route
              path='/recipe/:recipeId'
              render={(routerProps) => 
                <RecipePage
                  recipeId={routerProps.match.params.recipeId} 
                  history={routerProps.history}
                  key = {routerProps.match.params.recipeId}
                  location={routerProps.location}
                />
              }
            />
            <Route
              path='/category/:categoryId'
              render={(routerProps) => 
                <CategoryListPage 
                  categoryId={routerProps.match.params.categoryId} 
                  history={routerProps.history}
                  key = {routerProps.match.params.categoryId}
                />
              }
            />
            <Route
              path='/search/:query'
              render={(routerProps) =>
                <SearchListPage
                  query={routerProps.match.params.query} 
                  history={routerProps.history}
                  key = {routerProps.match.params.query}
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
