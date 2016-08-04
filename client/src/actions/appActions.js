import axios from 'axios';
import {API_VENUES_ENDPOINT, API_BASE_URL} from '../constants/endpoints';
import _ from 'lodash';

export function fetchVenues(location) {
  return function (dispatch) {
    dispatch(requestVenues(location));

    const endpoint = API_VENUES_ENDPOINT + '?lat=' + location.lat + '&lon=' + location.lon;
    axios.get(endpoint)
      .then((response) => {
        dispatch(receiveVenues(response.data.venues))
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

// TODO: name is deceptive since it actually toggles venue attendance
export function attendVenue(id) {
  return function (dispatch, getState) {
    dispatch(requestAttendVenue());
    const state = getState()
    const userId = state.app.user.id;
    const venues = state.app.venues;

    let action = '';
    if (_.keyBy(venues, 'id')[id].userGoing) {
      action = 'unattend';
    } else {
      action = 'attend';
    }

    const endpoint = API_BASE_URL + '/api/venue/' + id + '/' + action + '/' + userId;

    axios.post(endpoint, {})
      .then((response) => {
        dispatch(receiveAttendVenue(response.data))
        dispatch(fetchVenues);
      })
  }
}

export function requestAttendVenue() {
  return {
    type: 'REQUEST_ATTEND_VENUE'
  };
}

export function receiveAttendVenue() {
  return {
    type: 'RECEIVE_ATTEND_VENUE'
  }
}
