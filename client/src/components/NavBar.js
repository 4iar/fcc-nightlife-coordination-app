import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import showLogin from '../utils/showLogin';


export default class NavBar extends React.Component {
  render() {
    return (
      <AppBar
        title="Nightlife Coordinator"
        iconElementRight={<FlatButton onClick={showLogin} label="Login" />}
      />
    );
  }
}
