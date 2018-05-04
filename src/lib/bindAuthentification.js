/* eslint no-param-reassign: ["error", { "props": false }]*/

import { Map } from 'immutable';
import checkAccess from './checkAccess';

export default function (redux, handleSignIn, handleDenied) {
  return (resourceId, accessPermission) => (nextState, transition) => {
    const storeState = redux.getState();

    const user = storeState.get('user');

    if (Map.isMap(user) &&
      user.hasIn(['profile', 'name']) &&
      !user.get('isFetching') &&
      !user.get('error')
    ) {
      if (checkAccess(user, accessPermission, resourceId)) {
        return;
      }

      nextState.accessPermission = accessPermission;
      nextState.resourceId = resourceId;
      handleSignIn(nextState, transition);
    }

    handleDenied(nextState, transition);
  };
}
