import { CHANGE_TABLE_AMOUNT, CHANGE_PAGINATION_BY_NUMBER } from "./types";

export const changeTableAmount = (data) => dispatch => {
    return new Promise((resolve, reject) => {
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
        resolve({ pagcurrent: 1, tableamount: data.tableamount })
    });

};