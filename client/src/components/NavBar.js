import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';


export default class NavBar extends React.Component {
  render() {
    return (
      <AppBar
        title="Nightlife Coordinator"
        iconElementRight={<FlatButton label="Login" />}
      />
    );
  }
}
