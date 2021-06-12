import loggedReducer from "./isLogged";
import counterReducer from "./counter";
import postsReducer from "./posts";
import factoryReducer from "./factory"
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  posts: postsReducer,
  factory: factoryReducer
});

export default rootReducer;
