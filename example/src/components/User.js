import React, { PropTypes, Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { calcMd5 } from '../../../src';

class User extends Component {
  componentDidMount() {
    if (this.refs.username) {
      this.refs.username.focus();
    }
  }

  handleLogin() {
    this.props.actions.login({
      name: this.refs.username.input.value,
      password: calcMd5(this.refs.password.input.value),
    });
  }

  handleLogout() {
    this.props.actions.logout();
  }

  render() {
    let content;

    if (this.props.user.hasIn(['profile', 'displayName'])) {
      content = (
        <div>
          <h3>
            {this.props.user.getIn(['profile', 'displayName'])}
          </h3>
          <Divider />
          <FlatButton
            label="Выйти"
            style={{ margin: 12 }}
            onClick={::this.handleLogout}
          />
        </div>
      );
    } else {
      content = (
        <div>
          <TextField
            ref="username"
            hintText="Имя пользователя"
            style={{ marginLeft: 20 }}
            floatingLabelText="Имя пользователя"
            underlineShow={false}
          />
          <Divider />
          <TextField
            ref="password"
            type="password"
            hintText="Пароль"
            style={{ marginLeft: 20 }}
            floatingLabelText="Пароль"
            underlineShow={false}
          />
          <Divider />
          <FlatButton
            label="Войти"
            style={{ margin: 12 }}
            onClick={::this.handleLogin}
          />
        </div>
      );
    }


    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            {content}
          </div>
        </MuiThemeProvider>
      </div>
    );
  }
}

User.propTypes = {
  users: PropTypes.object,
  user: PropTypes.object,
  actions: PropTypes.object,
};

export default User;
