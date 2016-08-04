import axios from 'axios';
import {API_VENUES_ENDPOINT} from '../constants/endpoints';

export function fetchVenues(location) {
  return function (dispatch) {
    dispatch(requestVenues(location));

    const endpoint = API_VENUES_ENDPOINT + '?lat=' + location.lat + '&lon=' + location.lon;
    axios.get(endpoint)
      .then((response) => {
        console.log(response);
        dispatch(receiveVenues(response.data.data.businesses))  // need to modify this for new api
      })
  }
}

export function requestVenues() {
  return {
    type: 'REQUEST_VENUES'
  };
}

export function receiveVenues(venuesRaw) {
  const venues = venuesRaw.map((v) => {
    return {
      name: v.name,
      phone: v.display_phone,
      description: v.snippet_text,
      thumbnailUrl: v.snippet_image_url,
      headerUrl: v.snippet_image_url,  // need to get the large url
      numGoing: -1,
      distance: Math.floor(v.distance),
      userGoing: false
    }
  })


  return {
    type: 'RECEIVE_VENUES',
    payload: {
      venues
    }
  };
}
