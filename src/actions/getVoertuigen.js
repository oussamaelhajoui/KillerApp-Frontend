import { GET_VOERTUIGEN, CHANGE_LOADING_VOERTUIGEN } from "./types";

import Restful from '../logic/Restful';

export const getVoertuigen = (data) => dispatch => {
    dispatch({
        type: CHANGE_LOADING_VOERTUIGEN,
        payload: {
            loadingVoertuigen: true
        }
    });
    Restful.Post(`car/page/`, { page: 1, amount: 100 }, data.token)
        .then(response => { return response.json(); })
        .then(jsonResponse => {
            dispatch({
                type: GET_VOERTUIGEN,
                payload: {
                    voertuigen: [...jsonResponse["car"]],
                    loadingVoertuigen: false
                }
            });
        })
        .catch(message => {
            console.log(message);
        });
    // 

};