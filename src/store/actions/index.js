import {
  ADD_FACTORY_DATA,
  UPDATE_FACTORY_DATA,
  RECEIVE_FACTORY_DATA,
  INCREMENT,
  DECREMENT,
  SIGN_IN,
  POSTS,
} from "./types";
import factoryDataService from "../../services/factoryDataService";

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
  factoryDataService
    .getAll()
    .then((posts) =>
      dispatch({
        type: POSTS,
        payload: posts.data,
      })
    )
    .catch((e) => {
      console.log(e);
    });
};

export const fetchFactoryData = () => async dispatch => {
  factoryDataService
    .getAll()
    .then((result) =>
      dispatch({
        type: RECEIVE_FACTORY_DATA,
        payload: result.data
      })
    )
    .catch((error) => {
      console.error(error);
    });
  ;
};

export const addFactoryData = (data) => async dispatch => {
  factoryDataService
    .create(data)
    .then((result) => {
      console.log("result from post is: ", result)
      dispatch({
        type: ADD_FACTORY_DATA,
        payload: result
      })
    })
    .catch((error) => {
      console.error(error)
    })
}