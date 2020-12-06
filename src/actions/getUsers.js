import { GET_USERS, CHANGE_LOADING_USERS } from "./types";

import Restful from '../logic/Restful';

export const getUsers = (data) => dispatch => {
  return new Promise((resolve, reject) => {
    dispatch({
      type: CHANGE_LOADING_USERS,
      payload: {
        loadingUsers: true
      }
    });
    Restful.Post(`user/page/`, { page: 1, amount: 100 }, data.token)
      .then(response => { return response.json(); })
      .then(jsonResponse => {
        console.log("users", jsonResponse);
        dispatch({
          type: GET_USERS,
          payload: {
            users: [...jsonResponse["users"]],
            loadingUsers: false
          }
        });
        resolve(jsonResponse["users"]);
      })
      .catch(message => {
        console.log(message);
        reject(message);
      });
  });

  // 

};