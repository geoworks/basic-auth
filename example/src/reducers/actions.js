import * as types from './actionTypes';
import fetch from 'isomorphic-fetch';

export function loadLayersComplete(items) {
  return {
    type: types.LOAD_LAYERS_COMPLETE,
    items,
  };
}

export function loadLayersFailed(error) {
  return {
    type: types.LOAD_LAYERS_FAILED,
    error,
  };
}

export function loadLayers() {
  return dispatch => {
    dispatch({
      type: types.LOAD_LAYERS,
    });

    fetch('/api/layers', {
      credentials: 'include',
    }).then((response) => {
      if (response.status !== 200) {
        throw new Error('Bad response from server');
      }
      return response.json();
    })
    .then((items) => {
      dispatch(loadLayersComplete(items));
    });
  };
}
