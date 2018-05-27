import { LOG_OUT } from "./types";

export const logOut = () => dispatch => {
  sessionStorage.removeItem("loggedIn");
  dispatch({
    type: LOG_OUT,
    payload: {
      username: null,
      password: null,
      loggedIn: false,
      dbResponse: {}
    }
  });
  // Successful logout
};
