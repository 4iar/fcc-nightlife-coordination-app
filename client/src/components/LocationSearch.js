import React from 'react';
import Geosuggest from 'react-geosuggest';
import {connect} from 'react-redux';
import 'react-geosuggest/module/geosuggest.css';

import {fetchVenues} from '../actions/venuesActions';


@connect(null, {fetchVenues})
export default class LocationSearch extends React.Component {

  handleSuggestSelect(place) {
    this.props.fetchVenues({lat: place.location.lat, lon: place.location.lng});
  }

  render() {
    return (
      <Geosuggest onSuggestSelect={this.handleSuggestSelect.bind(this)}/>
    );
  }
}
