import initialState from './initialState';

export default function app(state = initialState.app, action) {
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
    default:
      return state;
  }
}
