import { GET_ROUTE } from "./types";
import Restful from '../logic/Restful';

export const getUser = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        Restful.Get(`user/select/${data.id}`, data.token)
            .then(response => response.json())
            .then(jsonResponse => {
                console.log(jsonResponse);
                dispatch({
                    type: GET_USER,
                    payload: {
                        newUser: { ...jsonResponse }
                    }
                });
                resolve(jsonResponse);
            })
            .catch(message => {
                console.log(message);
                reject(message);
            });
        // 
    });
};