import { INSERT_PLANNING, CHANGE_LOADING_INSERT_PLANNING, ERROR_INSERT } from "./types";

import Restful from '../logic/Restful';

export const insertPlanning = (data) => dispatch => {
    dispatch({
        type: CHANGE_LOADING_INSERT_PLANNING,
        payload: {
            successInsert: false,
            loadingInsertPlanning: true
        }
    });
    Restful.Post(`Schedule/create/`, {
        gebruiker: data.medewerker,
        route: data.route,
        voertuig: data.voertuig,
        datum: data.datum.replace(",", "")
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
            } else {
                dispatch({
                    type: ERROR_INSERT
                });
            }


        })
        .catch(message => {
            dispatch({
                type: ERROR_INSERT
            });
        });

    // 

};