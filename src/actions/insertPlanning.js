import { INSERT_PLANNING, CHANGE_LOADING_INSERT_PLANNING } from "./types";

import Restful from '../logic/Restful';

export const insertPlanning = (data) => dispatch => {
    dispatch({
        type: CHANGE_LOADING_INSERT_PLANNING,
        payload: {
            loadingInsertPlanning: true
        }
    });
    Restful.Post(`Schedule/create/`, {
        gebruiker: data.medewerker,
        route: data.route,
        voertuig: data.voertuig,
        datum: data.datum
    }, data.token)
        .then(response => { return response.json(); })
        .then(jsonResponse => {
            if (jsonResponse["success"] === true) {
                dispatch({
                    type: INSERT_PLANNING,
                    payload: {
                        successInsert: true,
                        loadingInsertPlanning: false,
                        planning: { ...jsonResponse["schedule"] }
                    }
                });

            }

        })
        .catch(message => {
            dispatch({
                type: INSERT_PLANNING,
                payload: {
                    successInsert: false,
                    loadingInsertPlanning: false
                }
            });
        });

    // 

};