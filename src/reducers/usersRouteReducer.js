import { GET_USERSONROUTE, CHANGE_LOADING_USERSONROUTE } from "../actions/types";

const initialState = {
    users: [],
    loadingUsers: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_USERSONROUTE:
            return {
                ...state,
                users: [...payload.users],
                loadingUsers: payload.loadingUsers
            };
        // break;
        case CHANGE_LOADING_USERSONROUTE:
            return {
                ...state,
                loadingUsers: payload.loadingUsers,
            };
        // break;
        default:
            return { ...state };
        // break;
    }
};
