import { GET_PLANNING, CHANGE_LOADING_PLANNING, INSERT_PLANNING, CHANGE_LOADING_INSERT_PLANNING, ERROR_INSERT, CHANGE_SUCCESS_INSERT } from "../actions/types";

const initialState = {
    planning: {},
    loadingInsertPlanning: false,
    loadingPlanning: false,
    successInsert: false,
    errorInsertMsg: ""
};

export default (state = initialState, { type, payload }) => {
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
                planning: { ...payload.planning },
                errorInsertMsg: ""
            };
        // break;
        case CHANGE_LOADING_INSERT_PLANNING:
            return {
                ...state,
                loadingInsertPlanning: payload.loadingInsertPlanning
            };
        // break;
        case ERROR_INSERT:
            return {
                ...state,
                loadingInsertPlanning: false,
                errorInsertMsg: "Data kon niet ingevoerd worden.",
                successInsert: false
            };
        case CHANGE_LOADING_PLANNING:
            return {
                ...state,
                loadingPlanning: payload.loadingPlanning,
            };
        // break;
        case CHANGE_SUCCESS_INSERT:
            return {
                ...state,
                successInsert: payload.successInsert
            };
        // break;=
        default:
            return { ...state };
        // break;
    }
};
