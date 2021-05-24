import { INCREMENT, DECREMENT, SIGN_IN, POSTS } from "./types";

export const increment = (number) => {
  return {
    type: INCREMENT,
    payload: number,
  };
};

export const decrement = (number) => {
  return {
    type: DECREMENT,
    payload: number,
  };
};

export const logged = () => {
  return {
    type: SIGN_IN,
  };
};

export const posts = () => (dispatch) => {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then((res) => res.json())
    .then((posts) =>
      dispatch({
        type: POSTS,
        payload: posts,
      })
    );
};
