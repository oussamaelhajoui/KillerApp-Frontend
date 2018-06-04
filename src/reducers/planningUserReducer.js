import { GET_PLANNINGENUSER, CHANGE_LOADING_PLANNINENGUSER } from "../actions/types";

const initialState = {
    planningen: [],
    loadingPlanning: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PLANNINGENUSER:
            return {
                ...state,
                planningen: [...payload.planningen],
                loadingPlanningen: payload.loadingPlanning
            };
        // break;
        case CHANGE_LOADING_PLANNINENGUSER:
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
