import { List, fromJS } from 'immutable';

import {
  LOAD_LAYERS,
  LOAD_LAYERS_COMPLETE,
  LOAD_LAYERS_FAILED,
} from './actionTypes';

const defaultState = fromJS({
  isFetching: false,
  error: '',
});

defaultState.items = new List();

export default function layers(state = defaultState, action) {
  switch (action.type) {
    case LOAD_LAYERS:
      return state.set('isFetching', true)
      .set('error', '');

    case LOAD_LAYERS_COMPLETE:
      return state.set('isFetching', false)
      .set('error', '').set('items', new List(action.items));

    case LOAD_LAYERS_FAILED:
      return state.set('isFetching', false)
      .set('error', action.error);

    default:
      return state;
  }
}
