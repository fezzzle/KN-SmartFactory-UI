import { RECEIVE_FACTORY_DATA } from "../actions/types";

const factoryReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FACTORY_DATA:
      return action.payload;
    default:
      return state;
  }
};

export default factoryReducer;