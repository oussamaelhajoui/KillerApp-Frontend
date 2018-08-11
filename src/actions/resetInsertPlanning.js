import { CHANGE_SUCCESS_INSERT } from "./types";

export const resetInsert = (data) => dispatch => {
    dispatch({
        type: CHANGE_SUCCESS_INSERT,
        payload: {
            successInsert: false
        }
    });
    // 
};