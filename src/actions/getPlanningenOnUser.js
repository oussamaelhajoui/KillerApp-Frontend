import { GET_PLANNINGENUSER, CHANGE_LOADING_PLANNINENGUSER } from "./types";

import Restful from '../logic/Restful';
export const getPlanningenOnUser = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        console.log(data);
        dispatch({
            type: CHANGE_LOADING_PLANNINENGUSER,
            payload: {
                loadingPlanningen: true
            }
        });
        Restful.Get(`schedule/onuser/${data.id}`, data.token)
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
                    resolve(jsonResponse["schedule"])
                    console.log(jsonResponse);
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
                reject(message);
            });
    });
};