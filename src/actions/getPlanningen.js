import { GET_PLANNINGEN, CHANGE_LOADING_PLANNING } from "./types";

import Restful from '../logic/Restful';

export const getPlanningen = (data) => dispatch => {
    dispatch({
        type: CHANGE_LOADING_PLANNING,
        payload: {
            loadingPlanningen: true
        }
    });
    Restful.Post(`schedule/page/`, { page: 1, amount: 9999999999999999999999999 }, data.token)
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