import { GET_PLANNINGEN, CHANGE_LOADING_PLANNINGEN } from "../actions/types";

const initialState = {
    planningen: [],
    loadingPlanningen: false,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PLANNINGEN:
            return {
                ...state,
                planningen: { ...payload.planningen },
                loadingPlanningen: payload.loadingPlanningen
            };
        // break;
        case CHANGE_LOADING_PLANNINGEN:
            return {
                ...state,
                loadingPlanningen: payload.loadingPlanningen,
            };
        // break;
        default:
            return { ...state };
        // break;
    }
};
