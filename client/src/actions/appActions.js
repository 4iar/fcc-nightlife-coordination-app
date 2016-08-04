import axios from 'axios';
import {API_VENUES_ENDPOINT} from '../constants/endpoints';

export function fetchVenues(location) {
  return function (dispatch) {
    dispatch(requestVenues(location));

    const endpoint = API_VENUES_ENDPOINT + '?lat=' + location.lat + '&lon=' + location.lon;
    axios.get(endpoint)
      .then((response) => {
        console.log(response);
        dispatch(receiveVenues(response.data))
      })
  }
}

export function requestVenues() {
  return {
    type: 'REQUEST_VENUES'
  };
}

export function receiveVenues(venues) {
  return {
    type: 'RECEIVE_VENUES',
    payload: {
      venues
    }
  };
}
