import { LOG_IN, LOG_OUT, CHECK_LOGIN, GET_USER, ERROR_LOGIN, CHANGE_LOADING } from "../actions/types";

const initialState = {
  loggedIn: false, // set to false
  username: "",
  password: "",
  userRole: null, //set to null
  token: null,
  dbResponse: {},
  permissions: [],
  errorMsg: "",
  loading: false,
  user: {
    id: null,
    username: null,
    firstname: null,
    lastname: null,
    email: null,
    role: null
  },
  existingPermissions: {
    ratevideo: "Rate video",
    viewuser: "View user",
    viewusers: "View users",
    edituser: "Edit user",
    adduser: "Add user",
    deleteuser: "Delete user",
    viewvideo: "View video",
    viewvideos: "View videos",
    viewdashboard: "View dashboard",
    manageroles: "Manage roles",
    managefeeds: "Manage feeds",
    deleterating: "Delete rating"

  }

};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        loggedIn: action.payload.loggedIn,
        token: action.payload.dbResponse.token,
        userRole: action.payload.dbResponse.role,
        dbResponse: { ...action.payload.dbResponse },
        errorMsg: ""
      };
    // break;
    case LOG_OUT:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        loggedIn: action.payload.loggedIn,
        token: null,
        userRole: null,
        dbResponse: { ...action.payload.dbResponse },
        permissions: [],
        errorMsg: ""

      };
    // break;
    case CHECK_LOGIN:
      return {
        ...state,
        username: action.payload.username,
        password: action.payload.password,
        loggedIn: action.payload.loggedIn,
        token: action.payload.dbResponse.token,
        userRole: action.payload.dbResponse.role,
        dbResponse: { ...action.payload.dbResponse },
        permissions: [...action.payload.permissions]
      };
    // break;
    case GET_USER:
      return {
        ...state,
        user: { ...action.payload.newUser }
      };
    // break;
    case ERROR_LOGIN:
      return {
        ...state,
        errorMsg: action.payload.errorMsg
      }
    // break;
    case CHANGE_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      }
    // break;
    default:
      return { ...state };
    // break;
  }
};
