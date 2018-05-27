import {
    POPULATE_ROUTE_TABLE,
    CHANGE_PAGINATION_COUNT,
    POPULATE_PAGINATION,
    CHANGE_LOADING_ROUTES
} from "./types";
import Restful from '../logic/Restful';

export const populateRouteTable = (data) => dispatch => {
    dispatch({
        type: POPULATE_ROUTE_TABLE,
        payload: {
            loadingroutes: true,
            routes: []
        }
    })

    Restful.Post(
        "route/page", {
            page: data.pagcurrent,
            amount: data.tableamount
        },
        data.token
    )
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse);
            if (jsonResponse["sucess"] == true) {

                let temppag = [];

                for (var i = 1; i < jsonResponse["total_pages"] + 1; i++) {
                    temppag.push(i);
                }
                dispatch({
                    type: POPULATE_ROUTE_TABLE,
                    payload: {
                        loadingroutes: false,
                        routes: jsonResponse["routes"]
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

                dispatch({
                    type: CHANGE_LOADING_ROUTES,
                    payload: {
                        loadingroutes: false
                    }
                });
            }
        })
        .catch(message => {
            console.log(message);
        });

};