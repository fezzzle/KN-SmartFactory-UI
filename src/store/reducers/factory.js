import { ADD_FACTORY_DATA, UPDATE_FACTORY_DATA, RECEIVE_FACTORY_DATA } from "../actions/types";

const factoryReducer = (state = [], action) => {
  console.log('action:', action)
  switch (action.type) {
    case RECEIVE_FACTORY_DATA:
      return action.payload;
    case ADD_FACTORY_DATA:
      return [...state, {...action.payload}]
    default:
      return state;
  }
};

export default factoryReducer;
