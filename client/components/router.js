import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, combineReducers, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import {Route} from 'react-router';
import AppBody from './app';
import {ConnectedRouter, routerReducer, routerMiddleware, push} from 'react-router-redux';

import mainReducer from '../reducer';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    mainReducer,
    router: routerReducer
  }),
  applyMiddleware(middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
);


// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <Route exact path="/" component={AppBody}/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app-body')
);
