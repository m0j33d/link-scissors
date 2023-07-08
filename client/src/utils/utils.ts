import axios from "axios";

const SET_LOGGED_IN = "setLoggedOut";

import { store } from "../redux/store";


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
