import { POPULATE_ROUTE_TABLE, CHANGE_LOADING_ROUTES, GET_ROUTES, GET_ROUTE } from "../actions/types";

const initialState = {
    routes: [],
    loadingroutes: false,
    selectedRoute: {}
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case POPULATE_ROUTE_TABLE:
        case GET_ROUTES:
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
        case GET_ROUTE:
            return {
                ...state,
                selectedRoute: payload.selectedRoute,
            };
        // break;
        default:
            return { ...state };
        // break;
    }
};
