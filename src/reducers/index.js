import { combineReducers } from "redux";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import paginationReducer from "./paginationReducer";

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  pagination: paginationReducer
});
