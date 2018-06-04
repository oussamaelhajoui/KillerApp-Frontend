import { GET_PLANNINGEN, CHANGE_LOADING_PLANNING } from "./types";

import Restful from '../logic/Restful';

export const getPlanningenOnUser = (data) => dispatch => {
    dispatch({
        type: CHANGE_LOADING_PLANNING,
        payload: {
            loadingPlanningen: true
        }
    });
    Restful.Get(`schedule/onuser/${data.medeweker}`, data.token)
        .then(response => { return response.json(); })
        .then(jsonResponse => {
            dispatch({
                type: GET_PLANNINGEN,
                payload: {
                    planningen: [...jsonResponse["schedule"]],
                    loadingPlanningen: false
                }
            });
        })
        .catch(message => {
            console.log(message);
        });
    // 

};