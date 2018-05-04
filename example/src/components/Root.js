import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux-immutablejs';
import injectTapEventPlugin from 'react-tap-event-plugin';

import reducers from '../reducers';
import createRoutes from '../createRoutes';
import { getReducers } from '../../../src';

injectTapEventPlugin();

const createThunkedStore = applyMiddleware(thunk)(createStore);

const reduxStore = createThunkedStore(combineReducers({
  ...reducers,
  ...getReducers(['users', 'user']),
}));

export default createRoutes(reduxStore);
