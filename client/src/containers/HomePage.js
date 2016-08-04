import React from 'react';
import { connect } from 'react-redux';

import Venue from '../components/Venue';
import LocationSearch from '../components/LocationSearch';
import NavBar from '../components/NavBar';


function getState(state) {
  return {
    venues: state.app.venues
  };
}

@connect(getState)
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      venues: []
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      venues: newProps.venues
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <LocationSearch />
        {this.state.venues.map((v) => {
          return (
            <Venue key={v.id} venue={v}/>
          )
        })}
      </div>
    );
  }
}
