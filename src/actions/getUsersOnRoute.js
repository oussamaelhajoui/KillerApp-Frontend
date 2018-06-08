import { GET_USERSONROUTE, CHANGE_LOADING_USERSONROUTE } from "./types";
import Restful from '../logic/Restful';

export const getPlanningenOnUser = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: CHANGE_LOADING_USERSONROUTE,
            payload: {
                loadingUsers: true
            }
        });
        Restful.Get(`user/onroute/${data.id}`, data.token)
            .then(response => { return response.json(); })
            .then(jsonResponse => {
                if (jsonResponse["success"]) {
                    dispatch({
                        type: GET_USERSONROUTE,
                        payload: {
                            users: [...jsonResponse["users"]],
                            loadingUsers: false
                        }
                    });
                    resolve(jsonResponse["users"])
                }

            })
            .catch(message => {
                console.log("catch", message);
                dispatch({
                    type: CHANGE_LOADING_USERSONROUTE,
                    payload: {
                        loadingUsers: false
                    }
                });
                reject(message);
            });
    });
};