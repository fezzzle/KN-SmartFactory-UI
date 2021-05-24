import loggedReducer from "./isLogged";
import counterReducer from "./counter";
import postsReducer from "./posts";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  counter: counterReducer,
  isLogged: loggedReducer,
  posts: postsReducer,
});

export default rootReducer;
