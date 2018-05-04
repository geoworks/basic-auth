import user from './reducers/user';
import users from './reducers/users';

export default (reducerNames) => {
  const defaultReducer = 'user';
  const names = reducerNames ? [...reducerNames, defaultReducer] : [defaultReducer];

  const reducers = {
    user,
    users,
  };

  return Object.keys(reducers)
    .filter(name => names.indexOf(name) > -1)
    .reduce((prev, cur) => Object.assign(prev, { [cur]: reducers[cur] }), {});
};
