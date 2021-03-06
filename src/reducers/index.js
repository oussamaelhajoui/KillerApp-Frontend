import { combineReducers } from "redux";
import userReducer from "./userReducer";
import usersReducer from "./usersReducer";
import paginationReducer from "./paginationReducer";
import routesReducer from "./RoutesReducerr";
import voertuigenReducer from "./voertuigenReducer";
import planningReducer from "./planningReducer";
import planningenReducer from "./planningenReducer";
import planningenUser from "./planningUserReducer";
import usersRoute from "./usersRouteReducer";

export default combineReducers({
  user: userReducer,
  users: usersReducer,
  routes: routesReducer,
  pagination: paginationReducer,
  planning: planningReducer,
  planningen: planningenReducer,
  voertuigen: voertuigenReducer,
  planningenUser,
  usersRoute
});
