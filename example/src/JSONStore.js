import fs from 'fs';

function readJsonFile(path, done) {
  fs.readFile(path, 'utf8', (err, data) => {
    done(err, JSON.parse(data));
  });
}

export default function (path) {
  return {
    path,
    getAccessTypes(done) {
      readJsonFile(this.path, (err, data) => {
        if (err) {
          throw err;
        }

        done(null, data.accessTypes);
      });
    },
    getUsers(done) {
      readJsonFile(this.path, (err, data) => {
        if (err) {
          throw err;
        }

        done(null, data.users);
      });
    },
    getRoles(done) {
      readJsonFile(this.path, (err, data) => {
        if (err) {
          throw err;
        }

        done(null, data.roles);
      });
    },
  };
}
