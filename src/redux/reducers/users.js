import { fromJS } from 'immutable';

import {
  LOAD_ROLES,
  LOAD_ROLES_COMPLETE,
  LOAD_ROLES_FAILED,
} from '../actions/types';

const defaultState = fromJS({
  isFetching: false,
  error: '',
  items: [],
});

export default function (state = defaultState, action) {
  switch (action.type) {
    case LOAD_ROLES:
      return state.set('isFetching', true)
      .set('error', '');

    case LOAD_ROLES_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '')
      .set('lastUpdated', new Date())
      .set('items', fromJS(action.items));

    case LOAD_ROLES_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    default:
      return state;
  }
}
