import axios from "axios";
import { store } from "../redux/store";


const SET_LOGGED_IN = "setLoggedOut";
const SET_ALERT_DETAILS = "setAlert";

export const authService = () => {
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error.response.status === 401) {
        store.dispatch({
          type: SET_LOGGED_IN,
          payload: false,
        });
      }

      return Promise.reject(error);
    }
  );
};

export const showAlert = (details : any) => {
  setAlertDetails(details);

  setTimeout(() => setAlertDetails(null), 5000);
}; 

export const setAlertDetails = (data : {type: string , msg:string} | null) => {
  store.dispatch({
    type: SET_ALERT_DETAILS,
    payload: data,
  });
};
