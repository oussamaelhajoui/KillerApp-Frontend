import { CHANGE_TABLE_AMOUNT, CHANGE_PAGINATION_BY_NUMBER } from "./types";

export const changeTableAmount = (data) => dispatch => {
    dispatch({
        type: CHANGE_TABLE_AMOUNT,
        payload: {
            tableamount: data.tableamount
        }
    });

    dispatch({
        type: CHANGE_PAGINATION_BY_NUMBER,
        payload: {
            pagcurrent: 1
        }
    });

};