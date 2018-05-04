import * as types from './types';
import api from '../../lib/api';

let basename;

function loginComplete(profile) {
  return {
    type: types.LOGIN_COMPLETE,
    profile,
  };
}

function loginFailed(error) {
  return {
    type: types.LOGIN_FAILED,
    error,
  };
}

function login(options, callback) {
  return dispatch => {
    dispatch({
      type: types.LOGIN,
    });

    api.login({
      basename: (options && options.basename) || basename,
      name: options.name, password: options.password,
    })
      .then((profile) => {
        callback(null, profile);
        dispatch(loginComplete(profile));
      })
      .catch((err) => {
        callback(err);
        dispatch(loginFailed(err));
      })
    ;
  };
}

function loadUserComplete(profile) {
  return {
    type: types.LOAD_USER_COMPLETE,
    profile,
  };
}

function loadUserFailed(error) {
  return {
    type: types.LOAD_USER_FAILED,
    error,
  };
}

function loadUser(options, callback) {
  return dispatch => {
    dispatch({
      type: types.LOAD_USER,
    });

    api.getUser({ basename: (options && options.basename) || basename })
      .then((profile) => {
        callback(null, profile);
        dispatch(loadUserComplete(profile));
      })
      .catch((err) => {
        callback(err);
        dispatch(loadUserFailed(err));
      })
    ;
  };
}

function logoutComplete() {
  return {
    type: types.LOGOUT_COMPLETE,
  };
}

function logoutFailed(error) {
  return {
    type: types.LOGOUT_FAILED,
    error,
  };
}

function logout(options, callback) {
  return dispatch => {
    dispatch({
      type: types.LOGOUT,
    });

    api.logout({ basename: (options && options.basename) || basename })
      .then(() => {
        callback(null, {});
        dispatch(logoutComplete());
      })
      .catch((err) => {
        callback(err);
        dispatch(logoutFailed(err));
      })
    ;
  };
}

function loadUsersComplete(items) {
  return {
    type: types.LOAD_USERS_COMPLETE,
    items,
  };
}

function loadUsersFailed(error) {
  return {
    type: types.LOAD_USERS_FAILED,
    error,
  };
}

function loadUsers(options, callback) {
  return dispatch => {
    dispatch({
      type: types.LOAD_USERS,
    });

    api.getUsers({ basename: (options && options.basename) || basename })
      .then((items) => {
        callback(null, items);
        dispatch(loadUsersComplete(items));
      })
      .catch((err) => {
        callback(err);
        dispatch(loadUsersFailed(err));
      })
    ;
  };
}

function loadRolesComplete(items) {
  return {
    type: types.LOAD_ROLES_COMPLETE,
    items,
  };
}

function loadRolesFailed(error) {
  return {
    type: types.LOAD_ROLES_FAILED,
    error,
  };
}

function loadRoles(options, callback) {
  return dispatch => {
    dispatch({
      type: types.LOAD_ROLES,
    });

    api.getRoles({ basename: (options && options.basename) || basename })
      .then((items) => {
        callback(null, items);
        dispatch(loadRolesComplete(items));
      })
      .catch((err) => {
        callback(err);
        dispatch(loadRolesFailed(err));
      })
    ;
  };
}

function loadAccessTypesComplete(items) {
  return {
    type: types.LOAD_ACCESSTYPES_COMPLETE,
    items,
  };
}

function loadAccessTypesFailed(error) {
  return {
    type: types.LOAD_ACCESSTYPES_FAILED,
    error,
  };
}

function loadAccessTypes(options, callback) {
  return dispatch => {
    dispatch({
      type: types.LOAD_ACCESSTYPES,
    });

    api.getAccessTypes({ basename: (options && options.basename) || basename })
      .then((items) => {
        callback(null, items);
        dispatch(loadAccessTypesComplete(items));
      })
      .catch((err) => {
        callback(err);
        dispatch(loadAccessTypesFailed(err));
      })
    ;
  };
}

export default (path) => {
  basename = path;

  return {
    login,
    logout,
    loadUsers,
    loadUser,
    loadRoles,
    loadAccessTypes,
  };
};
