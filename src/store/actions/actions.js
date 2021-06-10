import {
  ADD_FACTORY_DATA,
  REMOVE_FACTORY_DATA,
  UPDATE_FACTORY_DATA,
  RECEIVE_FACTORY_DATA,
  PATCH_PRODICTION_LINE_DATA,
  EDIT_FACTORY_LOCATION_DATA,
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
  try {
    const result = await factoryDataService.getAll()
    dispatch({
      type: RECEIVE_FACTORY_DATA,
      payload: result.data
    })
  } catch (err) {
    alert(err)
  }
};

export const addFactoryData = (data) => async dispatch => {
  factoryDataService
    .create(data)
    .then((result) => {
      dispatch({
        type: ADD_FACTORY_DATA,
        payload: result.data
      })
    })
    .catch((error) => console.error(error))
}

export const removeFactoryData = (id) => async dispatch => {
  dispatch({
    type: REMOVE_FACTORY_DATA,
    payload: id
  })
  factoryDataService
    .delete(id)
    .catch(error => console.error(error))
}

export const updateFactoryData = (data) => async dispatch => {
  try {
    await factoryDataService.update(data.id, data)
  } catch (err) {
    alert(err)
  }
  dispatch({
    type: UPDATE_FACTORY_DATA,
    payload: data
  })
}

export const updateThingArrayData = (factory_id, data) => async dispatch => {
  try {
    await factoryDataService.patch(factory_id, data)
  } catch (err) {
    alert(err)
  }
  // dispatch({
  //   type: UPDATE_FACTORY_DATA,
  //   payload: data
  // })
}

export const patchProductionLineData = (id, data) => async dispatch => {
  factoryDataService
    .patch(id, { production_line: data })
    .then(res => console.log("patchProductionLineData result is:", res))
    .catch(error => console.error(error))
  dispatch({
    type: PATCH_PRODICTION_LINE_DATA,
    payload: [id, data]
  })
}

export const editFactoryData = (id, data) => async dispatch => {
  try {
    await factoryDataService.patch(id, { "factory_location": data })
    dispatch({
      type: EDIT_FACTORY_LOCATION_DATA,
      payload: [id, data]
    })
  } catch (err) {
    alert(err)
  }
}
