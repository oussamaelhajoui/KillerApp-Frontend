import {
  POPULATE_PAGINATION,
  CHANGE_PAGINATION_COUNT,
  CHANGE_PAGINATION_BY_NUMBER,
  CHANGE_PAGINATION_BY_ARROW,
  CHANGE_TABLE_AMOUNT
} from "../actions/types";

const initialState = {
  pagcurrent: 1,
  pagli: [0],
  tableamount: 10,
  pagcount: 0
};

export default (state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case POPULATE_PAGINATION:
      return {
        ...state,
        pagli: payload.pagli
      };
      // break;
    case CHANGE_PAGINATION_COUNT:
      return {
        ...state,
        pagcount: payload.pagcount
      };
      // break;
    case CHANGE_PAGINATION_BY_NUMBER:
    case CHANGE_PAGINATION_BY_ARROW:
      return {
        ...state,
        pagcurrent: payload.pagcurrent
      };
      // break;
    case CHANGE_TABLE_AMOUNT:
      return {
        ...state,
        tableamount: payload.tableamount
      }
      // break;
    default:
      return { ...state
      };
      // break;
  }
};