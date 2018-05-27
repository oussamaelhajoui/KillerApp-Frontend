import { CHECK_LOGIN } from "./types";
import Restful from '../logic/Restful';

export const checkLogin = () => dispatch => {
  if (
    typeof sessionStorage.getItem("loggedIn") !== "undefined" &&
    sessionStorage.getItem("loggedIn") !== null
  ) {
    let data = JSON.parse(sessionStorage.getItem("loggedIn"));
    if (data.role !== 1) {
      Restful.Get(`role/get/${data.role}/permissions`, data.token)
        .then(response => response.json())
        .then(response => {
          dispatch({
            type: CHECK_LOGIN,
            payload: {
              username: data.username,
              loggedIn: true,
              token: data.token,
              dbResponse: { ...data },
              permissions: response
            }
          });
        });
    } else {
      dispatch({
        type: CHECK_LOGIN,
        payload: {
          username: data.username,
          loggedIn: true,
          token: data.token,
          dbResponse: { ...data },
          permissions: []
        }
      });
    }

    // Code for localStorage/sessionStorage.
  }

  // Successful logout
};
