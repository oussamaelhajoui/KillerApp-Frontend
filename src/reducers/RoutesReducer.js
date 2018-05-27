import { POPULATE_ROUTE_TABLE, CHANGE_LOADING_ROUTES } from "../actions/types";

const initialState = {
    routes: [],
    loadingroutes: false
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case POPULATE_ROUTE_TABLE:
            return {
                ...state,
                routes: [...payload.routes],
                loadingroutes: payload.loadingroutes
            };
        // break;
        case CHANGE_LOADING_ROUTES:
            return {
                ...state,
                loadingroutes: payload.loadingroutes
            };
        // break;
        default:
            return { ...state };
        // break;
    }
};
