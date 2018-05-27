import { LOG_IN, ERROR_LOGIN, CHANGE_LOADING } from "./types";
import Restful from "../logic/Restful";
export const logIn = ({ username, password }) => dispatch => {
  dispatch({
    type: CHANGE_LOADING,
    payload: {
      loading: true
    }
  });

  dispatch({
    type: ERROR_LOGIN,
    payload: {
      errorMsg: ""
    }
  });

  Restful.Post("auth/login", { username, password })
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse["success"] === true) { // check if logged in.
        dispatch({
          type: LOG_IN,
          payload: {
            username: username,
            password: password,
            loggedIn: true,
            dbResponse: jsonResponse
          }
        });

        dispatch({
          type: CHANGE_LOADING,
          payload: {
            loading: false
          }
        });

        sessionStorage.setItem("loggedIn", JSON.stringify(jsonResponse));
        // Successful login

        console.log(jsonResponse);
        // Auth.authenticate();
      } else {
        dispatch({ // error with username and password combination
          type: ERROR_LOGIN,
          payload: {
            errorMsg: "Can't login"
          }
        });
        dispatch({
          type: CHANGE_LOADING,
          payload: {
            loading: false
          }
        });

      }
    })
    .catch(message => { // error with connection..
      dispatch({
        type: ERROR_LOGIN,
        payload: {
          errorMsg: "Can't login"
        }
      });
      dispatch({
        type: CHANGE_LOADING,
        payload: {
          loading: false
        }
      });
      console.log(message);
    });
};
