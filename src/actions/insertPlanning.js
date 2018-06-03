import { INSERT_PLANNING, CHANGE_LOADING_INSERT_PLANNING } from "./types";

import Restful from '../logic/Restful';

export const insertPlanning = (data) => dispatch => {
    dispatch({
        type: CHANGE_LOADING_INSERT_PLANNING,
        payload: {
            loadingInsertPlanning: true
        }
    });
    Restful.Post(`planning/create/`, {
        gebruiker: data.medewerker,
        route: data.route,
        voertuig: data.route,
        datum: data.datum
    }, data.token)
        .then(response => { return response.json(); })
        .then(jsonResponse => {
            if (jsonResponse["success"] === true) {
                dispatch({
                    type: INSERT_PLANNING,
                    payload: {
                        success: true,
                        loadingInsertPlanning: false
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
            }

        })
        .catch(message => {
            dispatch({
                type: INSERT_PLANNING,
                payload: {
                    success: false,
                    loadingInsertPlanning: false
                }
            });
        });

    // 

};