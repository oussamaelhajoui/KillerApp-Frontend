import { CHANGE_TABLE_AMOUNT, CHANGE_PAGINATION_BY_NUMBER } from "./types";

export const resetPagination = () => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: CHANGE_TABLE_AMOUNT,
            payload: {
                tableamount: 10
            }
        });

        dispatch({
            type: CHANGE_PAGINATION_BY_NUMBER,
            payload: {
                pagcurrent: 1
            }
        });
        resolve(true);
    });
};
