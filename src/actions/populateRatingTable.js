import {
    POPULATE_RATING_TABLE,
    CHANGE_PAGINATION_COUNT,
    POPULATE_PAGINATION,
    CHANGE_LOADING_RATINGS
} from "./types";
import Restful from '../logic/Restful';

export const populateRatingTable = (data) => dispatch => {
    dispatch({
        type: POPULATE_RATING_TABLE,
        payload: {
            loadingRatings: true,
            ratings: []
        }
    })

    Restful.Post(
        `${data.type}/get/${data.media_id}/ratings`, {
            page: data.pagcurrent,
            amount: data.tableamount
        },
        data.token
    )
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse["total_pages"] >= 1) {

                let temppag = [];

                for (var i = 1; i < jsonResponse["total_pages"] + 1; i++) {
                    temppag.push(i);
                }
                dispatch({
                    type: POPULATE_RATING_TABLE,
                    payload: {
                        loadingRatings: false,
                        ratings: jsonResponse["results"]
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
            }
            dispatch({
                type: CHANGE_LOADING_RATINGS,
                payload: {
                    loadingRatings: false
                }
            });
        })
        .catch(message => {
            console.log(message);
        });

};