import { CHANGE_PASSWORD } from "./types";

import Restful from '../logic/Restful';

export const changePassword = (data) => dispatch => {
    return new Promise((resolve, reject) => {

        dispatch({
            type: CHANGE_PASSWORD,
            payload: {
                success_change: false,
                change_finished: false
            }
        });
        Restful.Post(`User/ChangePassword/${data.medewerker}`, {
            gebruiker: data.medewerker,
            wachtwoord: data.wachtwoord,
        }, data.token)
            .then(response => { return response.json(); })
            .then(jsonResponse => {
                if (jsonResponse["success"] === true) {
                    dispatch({
                        type: CHANGE_PASSWORD,
                        payload: {
                            success_change: true,
                            change_finished: true
                        }
                    });
                    resolve(jsonResponse)
                } else {
                    dispatch({
                        type: CHANGE_PASSWORD,
                        payload: {
                            success_change: false,
                            change_finished: true
                        }
                    });
                    reject(false)
                }


            })
            .catch(message => {
                dispatch({
                    type: CHANGE_PASSWORD,
                    payload: {
                        success_change: false,
                        change_finished: true
                    }
                });
                reject(false);
            });
    })


    // 

};