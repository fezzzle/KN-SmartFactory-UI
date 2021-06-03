import {
  REMOVE_FACTORY_DATA,
  ADD_FACTORY_DATA,
  UPDATE_FACTORY_DATA,
  RECEIVE_FACTORY_DATA,
  PATCH_FACTORY_DATA
} from "../actions/types";

const factoryReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_FACTORY_DATA:
      return action.payload;
    case ADD_FACTORY_DATA:
      return [...state, { ...action.payload }]
    case REMOVE_FACTORY_DATA:
      return state.filter(item => item.id !== action.payload)
    case UPDATE_FACTORY_DATA:
      return [...state.map(item => item.id === action.payload.id ? item = action.payload : item)]
    case PATCH_FACTORY_DATA:
      const data = action.payload[1]
      const position = action.payload[0]
      return state.map(item => item.id === position ? { ...item, production_line: data} : item)
    default:
      return state;
  }
};

export default factoryReducer;
