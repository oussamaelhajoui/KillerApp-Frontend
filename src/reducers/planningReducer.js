import { GET_PLANNING, CHANGE_LOADING_PLANNING, INSERT_PLANNING, CHANGE_LOADING_INSERT_PLANNING } from "../actions/types";

const initialState = {
    planning: {},
    loadingInsertPlanning: false,
    loadingPlanning: false,
    successInsert: false
};

export default (state = initialState, { type, payload }) => {
    console.log(type);
    console.log(payload);
    switch (type) {
        case GET_PLANNING:
            return {
                ...state,
                planning: { ...payload.planning },
                loadingPlanning: payload.loadingPlanning
            };
        // break;
        case INSERT_PLANNING:
            return {
                ...state,
                successInsert: payload.successInsert,
                loadingInsertPlanning: payload.loadingInsertPlanning,
                planning: { ...payload.planning }
            };
        // break;
        case CHANGE_LOADING_INSERT_PLANNING:
            return {
                ...state,
                loadingInsertPlanning: payload.loadingInsertPlanning
            };
        // break;
        case CHANGE_LOADING_PLANNING:
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
