import { CHANGE_PAGINATION_BY_NUMBER, CHANGE_PAGINATION_BY_ARROW } from "./types";

export const changePaginationByNumber = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({
            type: CHANGE_PAGINATION_BY_NUMBER,
            payload: {
                pagcurrent: parseInt(data.target.text, 10)
            }
        });
        resolve({ pagcurrent: parseInt(data.target.text, 10) });
    });
};

export const changePaginationByArrow = (data) => dispatch => {
    return new Promise((resolve, reject) => {
        if ((data.direction === "next" && data.pagcurrent === data.pagli.length) ||
            (data.direction === "previous" && data.pagcurrent === 1)) {
            return;
        }

        let tempPaginationCurr = data.pagcurrent;
        switch (data.direction) {
            case "previous":
                tempPaginationCurr -= 1;
                break;
            case "next":
                tempPaginationCurr += 1;

                break;
            default:
                break;
        }
        dispatch({
            type: CHANGE_PAGINATION_BY_ARROW,
            payload: {
                pagcurrent: tempPaginationCurr,
            }
        });
        resolve({ pagcurrent: tempPaginationCurr })
    });

};
