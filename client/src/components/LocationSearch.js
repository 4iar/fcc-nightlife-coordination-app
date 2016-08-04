import React from 'react';

import Geosuggest from 'react-geosuggest';
import 'react-geosuggest/module/geosuggest.css';


export default class LocationSearch extends React.Component {
  render() {
    return (
      <Geosuggest />
    );
  }
}
