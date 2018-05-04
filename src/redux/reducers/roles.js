import { fromJS } from 'immutable';

import {
  LOAD_USERS,
  LOAD_USERS_COMPLETE,
  LOAD_USERS_FAILED,
} from '../actions/types';

const defaultState = fromJS({
  isFetching: false,
  error: '',
  items: [],
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOAD_USERS:
      return state.set('isFetching', true)
      .set('error', '');

    case LOAD_USERS_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '')
      .set('lastUpdated', new Date())
      .set('items', fromJS(action.items));

    case LOAD_USERS_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    default:
      return state;
  }
}
