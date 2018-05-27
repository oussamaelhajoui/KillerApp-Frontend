import { combineReducers } from "redux";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import videosReducer from "./videosReducer";
import ratingReducer from "./ratingReducer";
import paginationReducer from "./paginationReducer";
import videoReducer from "./videoReducer";

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  pagination: paginationReducer
});
