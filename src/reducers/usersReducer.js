import { POPULATE_USER_TABLE, CHANGE_LOADING_USERS } from "../actions/types";

const initialState = {
  users: [],
  loadingUsers: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
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
