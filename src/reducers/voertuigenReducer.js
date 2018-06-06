import { GET_VOERTUIGEN, CHANGE_LOADING_VOERTUIGEN, POPULATE_VOERTUIGEN_TABLE } from "../actions/types";

const initialState = {
    voertuigen: [],
    loadingVoertuigen: false
};

export default (state = initialState, { type, payload }) => {

    switch (type) {
        case GET_VOERTUIGEN:
        case POPULATE_VOERTUIGEN_TABLE:
            return {
                ...state,
                voertuigen: [...payload.voertuigen],
                loadingVoertuigen: payload.loadingVoertuigen
            };
        // break;
        case CHANGE_LOADING_VOERTUIGEN:
            return {
                ...state,
                loadingVoertuigen: payload.loadingVoertuigen
            };
        // break;
        default:
            return { ...state };
        // break;
    }
};
