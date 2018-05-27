import { GET_USERS } from "./types";

export const getUsers = () => dispatch => {
  dispatch({
    type: GET_USERS,
    payload: {
      users: data.username ? data.username : null
    }
  });
};
