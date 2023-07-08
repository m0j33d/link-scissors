
const GET_ANALYTICS= "getAnalytics";
const LOGIN_USER = "loginUser";
const SET_USER = "setUser";
const SET_LOGGED_IN = "setLoggedOut";
const RESET = "reset";
const SET_ALERT_DETAILS = "setAlert"

  export const initialState = {
    api_host: process.env.REACT_APP_API_URL,
    user: null,
    user_token: null,
    logged_in: false,
    alert_details: null,
  };
  
  
  export default function reducer(state = initialState, action: { type: string, payload: any }) {
    switch (action.type) {
      case RESET:
        return initialState;
      case LOGIN_USER:
        return {
          ...state,
          user_token: action.payload,
          logged_in: true,
        };
      case SET_USER:
        return {
          ...state,
          user: action.payload,
        };
      case SET_LOGGED_IN:
        return {
          ...state,
          logged_in: action.payload,
        };
      case SET_ALERT_DETAILS:
          return {
            ...state,
            alert_details: action.payload,
          };
      default:
        return state;
    }
  }