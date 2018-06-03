import { GET_ROUTES, CHANGE_LOADING_ROUTES } from "./types";

import Restful from '../logic/Restful';

export const getRoutes = (data) => dispatch => {
    dispatch({
        type: CHANGE_LOADING_ROUTES,
        payload: {
            loadingroutes: true
        }
    });
    Restful.Post(`route/page/`, { page: 1, amount: 1000 }, data.token)
        .then(response => { return response.json(); })
        .then(jsonResponse => {
            dispatch({
                type: GET_ROUTES,
                payload: {
                    routes: [...jsonResponse["routes"]],
                    loadingroutes: false
                }
            });
        })
        .catch(message => {
            console.log(message);
        });
    // 

};