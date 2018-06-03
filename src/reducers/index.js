import { combineReducers } from "redux";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import paginationReducer from "./paginationReducer";
import routesReducer from "./routesReducer";
import voertuigenReducer from "./voertuigenReducer";
import planningReducer from "./planningReducer";

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  routes: routesReducer,
  pagination: paginationReducer,
  planning: planningReducer,
  voertuigen: voertuigenReducer
});
