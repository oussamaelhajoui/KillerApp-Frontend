import {
    POPULATE_VOERTUIGEN_TABLE,
    CHANGE_PAGINATION_COUNT,
    POPULATE_PAGINATION,
    CHANGE_LOADING_VOERTUIGEN
} from "./types";
import Restful from '../logic/Restful';

export const populateVoertuigTable = (data) => dispatch => {
    dispatch({
        type: POPULATE_VOERTUIGEN_TABLE,
        payload: {
            loadingVoertuigen: true,
            voertuigen: []
        }
    })
    Restful.Post(
        "car/page", {
            page: data.pagcurrent,
            amount: data.tableamount
        },
        data.token
    )
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse["success"] === true) {

                let temppag = [];

                for (var i = 1; i < jsonResponse["total_pages"] + 1; i++) {
                    temppag.push(i);
                }
                dispatch({
                    type: POPULATE_VOERTUIGEN_TABLE,
                    payload: {
                        loadingVoertuigen: false,
                        voertuigen: [...jsonResponse["car"]]
                    }
                });
                dispatch({
                    type: CHANGE_PAGINATION_COUNT,
                    payload: {
                        pagcount: jsonResponse["total_pages"]
                    }
                });
                dispatch({
                    type: POPULATE_PAGINATION,
                    payload: {
                        pagli: [...temppag],
                    }
                });
            } else {

                dispatch({
                    type: CHANGE_LOADING_VOERTUIGEN,
                    payload: {
                        loadingVoertuigen: false
                    }
                });
            }
        })
        .catch(message => {
            console.log(message);
        });

};