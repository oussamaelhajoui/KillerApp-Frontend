import { CHECK_LOGIN } from "./types";

export const checkLogin = () => dispatch => {
  if (
    typeof sessionStorage.getItem("loggedIn") !== "undefined" &&
    sessionStorage.getItem("loggedIn") !== null
  ) {
    let data = JSON.parse(sessionStorage.getItem("loggedIn"));
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

    // Code for localStorage/sessionStorage.
  }

  // Successful logout
};
