import { GET_USERS, CHANGE_LOADING_USERS, POPULATE_USER_TABLE } from "../actions/types";

const initialState = {
  users: [],
  loadingUsers: false
};

export default (state = initialState, { type, payload }) => {

  switch (type) {
    case GET_USERS:
    case POPULATE_USER_TABLE:
      return {
        ...state,
        users: [...payload.users],
        loadingUsers: payload.loadingUsers
      };
    // break;
    case CHANGE_LOADING_USERS:
      return {
        ...state,
        loadingUsers: payload.loadingUsers
      };
    // break;
    default:
      return { ...state };
    // break;
  }
};
