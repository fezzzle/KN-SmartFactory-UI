import {
  REMOVE_FACTORY_DATA,
  ADD_FACTORY_DATA,
  UPDATE_FACTORY_DATA,
  RECEIVE_FACTORY_DATA,
  PATCH_FACTORY_PLINE_DATA,
  UPDATE_THINGS_ARRAY,
  PATCH_PRODICTION_LINE_DATA,
  EDIT_FACTORY_LOCATION_DATA,
  REMOVE_THINGS_FROM_THINGS_ARRAY,
  REMOVE_DEVICE_FROM_DEVICE_ARRAY
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
    case PATCH_FACTORY_PLINE_DATA:
      return state.filter(item => item.id === action.payload.id)
    case UPDATE_THINGS_ARRAY:
      return [...state.map(item => item.id === action.payload.id ? item = action.payload : item)]
    case REMOVE_THINGS_FROM_THINGS_ARRAY:
      return [...state.map(item => item.id === action.payload.id ? { ...item, production_line: action.payload.production_line } : item)]
    case REMOVE_DEVICE_FROM_DEVICE_ARRAY:
      return [...state.map(item => item.id === action.payload.id ? { ...item, item: action.payload } : item)]
    case PATCH_PRODICTION_LINE_DATA: {
      const data = action.payload[1]
      const position = action.payload[0]
      return state.map(item => item.id === position ? { ...item, production_line: data } : item)
    }
    case EDIT_FACTORY_LOCATION_DATA: {
      const data = action.payload[1]
      const position = action.payload[0]
      return state.map(item => item.id === position ? { ...item, factory_location: data } : item)
    }
    default:
      return state;
  }
};

export default factoryReducer;
