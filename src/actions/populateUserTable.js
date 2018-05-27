import {
    POPULATE_USER_TABLE,
    CHANGE_PAGINATION_COUNT,
    POPULATE_PAGINATION
} from "./types";
import Restful from '../logic/Restful';

export const populateUserTable = (data) => dispatch => {
    dispatch({
        type: POPULATE_USER_TABLE,
        payload: {
            loadingUsers: true,
            users: []
        }
    })

    Restful.Post(
        "user/page", {
            page: data.pagcurrent,
            amount: data.tableamount,
            query: data.query
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
                    type: POPULATE_USER_TABLE,
                    payload: {
                        loadingUsers: false,
                        users: jsonResponse["results"]
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



                //populate pagination

            } else {
                alert("Error");
            }
        })
        .catch(message => {
            console.log(message);
        });

};