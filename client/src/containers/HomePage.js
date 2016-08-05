import React from 'react';
import { connect } from 'react-redux';

import Venue from '../components/Venue';
import LocationSearch from '../components/LocationSearch';
import NavBar from '../components/NavBar';


function getState(state) {
  return {
    venues: state.venues.venues
  };
}

@connect(getState)
export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      venues: null
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
        <LocationSearch query={this.props.location.query} />
        {this.state.venues && this.state.venues.length === 0 &&
        <h2 style={{textAlign: 'center'}}>Nothing going on here :(</h2>
        }

        {this.state.venues !== null && this.state.venues.length > 0 &&
        this.state.venues.map((v) => {
          return (
            <Venue key={v.id} venue={v}/>
          )
        })}
      </div>
    );
  }
}
