import initialState from './initialState';


export default function user(state = initialState.user, action) {
  switch (action.type) {
    case 'RECEIVE_VENUES': {
      console.log("got venues");
      console.log(action.payload.venues);
      return {
        ...state,
        venues: action.payload.venues
      };
    }
    case 'REQUEST_VENUES': {
      console.log("request sent");
      return {
        ...state,
        loading: true
      };
    }
    case 'NEW_LOCATION': {
      return {
        ...state,
        location: action.payload.location
      }
    }
    default:
      return state;
  }
}
