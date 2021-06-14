import factoryReducer from "./factory"
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  factory: factoryReducer
});

export default rootReducer;
