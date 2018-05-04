import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { Tabs, Tab } from 'material-ui/Tabs';
import Lock from 'material-ui/svg-icons/action/lock';
import LockOpen from 'material-ui/svg-icons/action/lock-open';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Paper from 'material-ui/Paper';

import { getActions } from '../../../src';
import * as appActions from '../reducers/actions';

const actions = getActions('api');

function select(state) {
  return {
    layers: state.get('layers'),
    users: state.get('users'),
    user: state.get('user'),
  };
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(actions.loadUser());
  }

  render() {
    const {
      location,
      children,
      dispatch,
    } = this.props;

    const content = React.cloneElement(children, {
      layers: this.props.layers,
      users: this.props.users,
      user: this.props.user,
      actions: {
        ...bindActionCreators(actions, dispatch),
        ...bindActionCreators(appActions, dispatch),
      },
    });

    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Paper
            style={{
              width: '30%',
              margin: '15px auto',
            }}
            zDepth={2}
          >
            <Tabs
              value={location.pathname}
              onChange={(value) => {
                if (typeof value === 'string') {
                  browserHistory.push({
                    pathname: value,
                  });
                }
              }}
            >
              <Tab
                icon={<Lock />}
                label="Слои"
                value={'/layers'}
              >
                <div>
                  {
                    location.pathname === '/layers' &&
                    content
                  }
                </div>
              </Tab>
              <Tab
                icon={<LockOpen />}
                label="Пользователи"
                value={'/users'}
              >
                <div>
                  {
                    location.pathname === '/users' &&
                    content
                  }
                </div>
              </Tab>
              <Tab
                icon={<LockOpen />}
                label="Пользователь"
                value={'/user'}
              >
                <div>
                  {
                    location.pathname === '/user' &&
                    content
                  }
                </div>
              </Tab>
            </Tabs>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

App.propTypes = {
  layers: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  children: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
};

export default (connect(select))(App);
