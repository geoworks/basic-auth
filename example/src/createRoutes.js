import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory, Route, Redirect } from 'react-router';
import Layers from './components/Layers';
import Users from './components/Users';
import User from './components/User';
import NotFound from './components/NotFound';
import AccessDenied from './components/AccessDenied';
import App from './components/App';
import { bindAuthentification } from '../../src';
import * as appActions from './reducers/actions';

export default (store) => {
  const requireAccess = bindAuthentification(store, (nextState, replace) => {
    replace({
      next: nextState.location.pathname,
      accessPermissions: nextState.accessPermission,
      resourceId: nextState.resourceId,
    });
  }, (nextState, replace) => {
    replace({}, '/403');
  });

  let previousState;
  let currentState;

  store.subscribe(() => {
    currentState = store.getState();

    if (previousState) {
      if (
        currentState.getIn(['user', 'profile', 'displayName']) !==
        previousState.getIn(['user', 'profile', 'displayName'])
      ) {
        previousState = store.getState();
        // store.dispatch(actions.loadUsers());
        store.dispatch(appActions.loadLayers());
      }
    } else {
      previousState = currentState;
    }
  });

  return () => (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Redirect from="/" to="/user" />
        <Route path="/" component={App}>
          <Route
            path="layers"
            component={Layers}
            onEnter={requireAccess('layers', 'route-viewing')}
          />
          <Route
            path="users"
            component={Users}
            onEnter={requireAccess('users', 'route-viewing')}
          />
          <Route path="user" component={User} />
          <Route path="403" component={AccessDenied} />
          <Route path="*" component={NotFound} />
        </Route>
      </Router>
    </Provider>
  );
};
