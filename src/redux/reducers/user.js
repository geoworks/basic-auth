import { fromJS } from 'immutable';

import {
  LOAD_USER,
  LOAD_USER_COMPLETE,
  LOAD_USER_FAILED,
  LOGIN,
  LOGIN_COMPLETE,
  LOGIN_FAILED,
  LOGOUT,
  LOGOUT_COMPLETE,
  LOGOUT_FAILED,
} from '../actions/types';

const defaultState = fromJS({
  isFetching: false,
  error: '',
  profile: {},
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOGIN:
    case LOAD_USER:
      return state.set('isFetching', true)
      .set('error', '');

    case LOGIN_COMPLETE:
    case LOAD_USER_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '')
      .set('lastUpdated', new Date())
      .set('profile', fromJS(action.profile));

    case LOGIN_FAILED:
    case LOAD_USER_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    case LOGOUT:
      return state.set('isFetching', true)
      .set('error', '');

    case LOGOUT_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '')
      .set('lastUpdated', new Date())
      .set('profile', {});

    case LOGOUT_FAILED:
      return state.set('isFetching', false)
      .set('lastUpdated', new Date())
      .set('error', action.error);

    default:
      return state;
  }
}
