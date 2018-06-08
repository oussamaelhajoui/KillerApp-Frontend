import { GET_PLANNINGEN, CHANGE_LOADING_PLANNING } from "./types";

import Restful from '../logic/Restful';

export const getPlanningen = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: CHANGE_LOADING_PLANNING,
            payload: {
                loadingPlanningen: true
            }
        });
        Restful.Post(`schedule/page/`, { page: 1, amount: 999999999 }, data.token)
            .then(response => { return response.json(); })
            .then(jsonResponse => {
                dispatch({
                    type: GET_PLANNINGEN,
                    payload: {
                        planningen: [...jsonResponse["schedule"]],
                        loadingPlanningen: false
                    }
                });
                resolve(jsonResponse["schedule"]);
            })
            .catch(message => {
                console.log(message);
                reject(message);
            });
    })

    // 

};