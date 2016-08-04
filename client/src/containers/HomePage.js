import React from 'react';
import Geosuggest from 'react-geosuggest';

import Venue from '../components/Venue';

import 'react-geosuggest/module/geosuggest.css';


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
        <Geosuggest />
        <Venue />
        <Venue />
        <Venue />
        <Venue />
      </div>
    );
  }
}
