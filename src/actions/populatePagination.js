import { POPULATE_PAGINATION } from "./types";

export const populatePagination = (data) => dispatch => {
  

  let temppag = [];

  for (var i = 1; i < data.pagcount + 1; i++) {
    temppag.push(i);
  }

  dispatch({
    type: POPULATE_PAGINATION,
    payload: {
      pagli: [...temppag],
    }
  });
};
