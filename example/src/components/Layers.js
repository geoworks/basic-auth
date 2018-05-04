import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { List, ListItem } from 'material-ui/List';

const Layers = ({ layers }) => (
  <MuiThemeProvider muiTheme={getMuiTheme()}>
    <List>
      {
        layers.get('items') &&
        layers.get('items').map((item) => (
          <ListItem
            key={item.id}
          >
            {item.displayName}
          </ListItem>
        ))
      }
    </List>
  </MuiThemeProvider>
);

Layers.propTypes = {
  layers: PropTypes.object,
  users: PropTypes.object,
  actions: PropTypes.object,
};

export default Layers;
