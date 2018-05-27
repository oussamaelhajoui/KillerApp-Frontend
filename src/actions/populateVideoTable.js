import {
    POPULATE_VIDEO_TABLE,
    CHANGE_PAGINATION_COUNT,
    POPULATE_PAGINATION
} from "./types";
import Restful from '../logic/Restful';

export const populateVideoTable = (data) => dispatch => {
    dispatch({
        type: POPULATE_VIDEO_TABLE,
        payload: {
            loadingVideos: true,
            videos: []
        }
    })

    Restful.Post(
        "video/page", {
            page: data.pagcurrent,
            amount: data.tableamount,
            query: data.query
        },
        data.token
    )
        .then(response => response.json())
        .then(jsonResponse => {
            if (jsonResponse["total_pages"] >= 1) {

                console.log(jsonResponse);
                let temppag = [];

                for (var i = 1; i < jsonResponse["total_pages"] + 1; i++) {
                    temppag.push(i);
                }
                dispatch({
                    type: POPULATE_VIDEO_TABLE,
                    payload: {
                        loadingVideos: false,
                        videos: jsonResponse["results"]
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