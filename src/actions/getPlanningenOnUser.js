import { GET_PLANNINGENUSER, CHANGE_LOADING_PLANNINENGUSER } from "./types";

import Restful from '../logic/Restful';
export const getPlanningenOnUser = (data) => dispatch => {
    dispatch({
        type: CHANGE_LOADING_PLANNINENGUSER,
        payload: {
            loadingPlanningen: true
        }
    });
    Restful.Get(`schedule/onuser/${data.medewerker}`, data.token)
        .then(response => { return response.json(); })
        .then(jsonResponse => {
            if (jsonResponse["success"]) {
                dispatch({
                    type: GET_PLANNINGENUSER,
                    payload: {
                        planningen: [...jsonResponse["schedule"]],
                        loadingPlanningen: false
                    }
                });
            }

        })
        .catch(message => {
            console.log("catch", message);
            dispatch({
                type: CHANGE_LOADING_PLANNINENGUSER,
                payload: {
                    loadingPlanningen: false
                }
            });

        });
    // 

};