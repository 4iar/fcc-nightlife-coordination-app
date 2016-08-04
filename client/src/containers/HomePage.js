import React from 'react';

import Venue from '../components/Venue';
import LocationSearch from '../components/LocationSearch';



export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // get data
  }

  render() {
    return (
      <div>
        <LocationSearch />
        <Venue />
        <Venue />
        <Venue />
        <Venue />
      </div>
    );
  }
}
