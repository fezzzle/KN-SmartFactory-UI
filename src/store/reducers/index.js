import factoryReducer from "./factory"
import isLoadingReducer from "./isLoading"
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  factory: factoryReducer,
  isLoading: isLoadingReducer
});

export default rootReducer;
