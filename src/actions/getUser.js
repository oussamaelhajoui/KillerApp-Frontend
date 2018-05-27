import { GET_USER } from "./types";
import Restful from '../logic/Restful';

export const getUser = (data) => dispatch => {
    console.log("getting user", data);
    Restful.Get(`user/get/${data.id}`, data.token)
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse);
            dispatch({
                type: GET_USER,
                payload: {
                    newUser: { ...jsonResponse }
                }
            });
        })
        .catch(message => {
            console.log(message);
        });
    // 

};