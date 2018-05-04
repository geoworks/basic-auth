/* eslint no-shadow: ["error", { "allow": ["err"] }]*/
/* eslint no-param-reassign: ["error", { "props": false }]*/

import checkAccess from './checkAccess';

export default function (store) {
  function getUserRoute(req, res, next) {
    if (req.method === 'GET' && req.path === '/user') {
      if (req.session.user && req.session.user.profile) {
        res.json(req.session.user.profile);
      } else {
        res.sendStatus(403);
      }
    }
    next();
  }

  function logoutRoute(req, res, next) {
    if (req.method === 'GET' && req.path === '/logout') {
      req.session.destroy(() => {
        res.json({});
      });
    } else {
      next();
    }
  }

  function loginRoute(req, res, next) {
    if (req.method === 'POST' && req.path === '/login') {
      store.getUsers((err, users) => {
        if (err) {
          res.sendStatus(500);
        }

        store.getRoles((err, roles) => {
          if (err) {
            res.sendStatus(500);
          }

          const user = users.filter(item => item.name === req.body.name);

          if (user && user.length) {
            if (user[0].passwordHash === req.body.password) {
              let mapping = [];

              if (roles) {
                mapping = roles.filter(role => role.userIds.indexOf(user[0].id) > -1);
              }

              const profile = {
                ...user[0],
                roles: mapping,
              };

              req.session.regenerate(() => {
                req.session.user = {
                  profile,
                };
                req.session.save();
                res.json(profile);
              });
            } else {
              res.sendStatus(400);
            }
          } else {
            res.sendStatus(404);
          }
        });
      });
    } else {
      next();
    }
  }

  function getRolesRoute(req, res, next) {
    if (req.method === 'GET' && req.path === '/roles') {
      store.getRoles((err, data) => {
        if (err) {
          res.sendStatus(500);
        }

        res.json(data.filter(item => checkAccess(req.user, 'viewing', item.id)));
      });
    } else {
      next();
    }
  }

  function getUsersRoute(req, res, next) {
    if (req.method === 'GET' && req.path === '/users') {
      store.getUsers((err, users) => {
        if (err) {
          res.sendStatus(500);
        }

        store.getRoles((err, roles) => {
          if (err) {
            res.sendStatus(500);
          }

          const mapping = {};

          roles.forEach((role) => {
            if (role.userIds) {
              role.userIds.forEach((userId) => {
                if (mapping[userId]) {
                  mapping[userId].push(roles);
                } else {
                  mapping[userId] = [role];
                }
              });
            }
          });

          res.json(users.filter(item => checkAccess(req.user, 'viewing', item.id))
            .map(item => ({ ...item, roles: mapping[item.id] }))
          );
        });
      });
    } else {
      next();
    }
  }

  function getAccessTypesRoute(req, res, next) {
    if (req.method === 'GET' && req.path === '/accesstypes') {
      store.getAccessTypes((err, data) => {
        if (err) {
          res.sendStatus(500);
        }

        res.json(data.filter(item => checkAccess(req.user, 'viewing', item.id)));
      });
    } else {
      next();
    }
  }

  return [
    getUserRoute,
    loginRoute,
    logoutRoute,
    getRolesRoute,
    getUsersRoute,
    getAccessTypesRoute,
  ];
}
