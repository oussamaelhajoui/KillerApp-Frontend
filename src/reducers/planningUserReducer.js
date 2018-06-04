import { GET_PLANNINGENUSER, CHANGE_LOADING_PLANNINGUSER } from "../actions/types";

const initialState = {
    planningen: [{}],
    loadingPlanning: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PLANNINGENUSER:
            return {
                ...state,
                planning: [...payload.planning],
                loadingPlanning: payload.loadingPlanning
            };
        // break;
        case CHANGE_LOADING_PLANNINGUSER:
            return {
                ...state,
                loadingPlanning: payload.loadingPlanning,
            };
        // break;
        default:
            return { ...state };
        // break;
    }
};
