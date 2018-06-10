import { GET_USERSONROUTE, CHANGE_LOADING_USERSONROUTE, GET_ROUTE } from "./types";
import Restful from '../logic/Restful';

export const getUsersOnRoute = (data) => dispatch => {
    console.log("data", data)
    return new Promise((resolve, reject) => {
        dispatch({
            type: CHANGE_LOADING_USERSONROUTE,
            payload: {
                loadingUsers: true
            }
        });
        Restful.Post(`user/onroutepage/${data.id}`, { page: 1, amount: 1000 }, data.token)
            .then(response => { return response.json(); })
            .then(jsonResponse => {
                if (jsonResponse["success"]) {
                    dispatch({
                        type: GET_USERSONROUTE,
                        payload: {
                            data: [...jsonResponse["data"]],
                            loadingUsers: false
                        }
                    });
                    dispatch({
                        type: GET_ROUTE,
                        payload: {
                            selectedRoute: { ...data.selectedRoute },
                        }
                    });
                    resolve(jsonResponse)
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