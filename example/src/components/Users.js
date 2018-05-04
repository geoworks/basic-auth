import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { List, ListItem } from 'material-ui/List';

const Users = ({ users }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <div>
      <List>
        {
          users.get('items') &&
          users.get('items').map((item) => (
            <ListItem
              key={item.id}
            >
              {item.displayName}
            </ListItem>
          ))
        }
      </List>
    </div>
  </MuiThemeProvider>
);

Users.propTypes = {
  layers: PropTypes.object,
  users: PropTypes.object,
  actions: PropTypes.object,
};

export default Users;
