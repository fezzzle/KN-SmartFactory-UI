import {
  ADD_FACTORY_DATA,
  REMOVE_FACTORY_DATA,
  UPDATE_FACTORY_DATA,
  RECEIVE_FACTORY_DATA,
  PATCH_PRODICTION_LINE_DATA,
  EDIT_FACTORY_LOCATION_DATA,
  PATCH_FACTORY_PLINE_DATA,
  SIGN_IN,
  REMOVE_DEVICE_FROM_DEVICE_ARRAY,
  REMOVE_THINGS_FROM_THINGS_ARRAY,
  SET_LOADING
} from "./types";
import factoryDataService from "../../services/factoryDataService";

export const logged = () => {
  return {
    type: SIGN_IN,
  };
};
export const fetchFactoryData = () => async dispatch => {
  try {
    // dispatch(setIsLoading(true))
    const result = await factoryDataService.getAll()
    dispatch({
      type: RECEIVE_FACTORY_DATA,
      payload: result.data
    })
    // dispatch(setIsLoading(false))
  } catch (err) {
    console.log(err)
  }

};

export const setIsLoading = (isLoading) => async dispatch => {
  console.log('IN SETISLOADING:', isLoading)
  dispatch({
    type: SET_LOADING,
    payload: isLoading
  })
}

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
  try {
    factoryDataService.delete(id)
  } catch (err) {
    console.error(err)
  }
}

export const patchFactoryData = (factory_id, data) => async dispatch => {
  dispatch({
    type: PATCH_FACTORY_PLINE_DATA,
    payload: data
  })
  try {
    await factoryDataService.patch(factory_id, data)
  } catch (err) {
    console.log(err)
  }
}

export const updateFactoryData = (data) => async dispatch => {
  try {
    await factoryDataService.update(data.id, data)
  } catch (err) {
    console.log(err)
  }
  dispatch({
    type: UPDATE_FACTORY_DATA,
    payload: data
  })
}

export const removeFromThingsAction = (factory_id, data) => async dispatch => {
  dispatch({
    type: REMOVE_THINGS_FROM_THINGS_ARRAY,
    payload: data
  })
  try {
    await factoryDataService.patch(factory_id, data)
  } catch (err) {
    console.log(err)
  }
}

export const removeFromDevicesAction = (factory_id, data) => async dispatch => {
  dispatch({
    type: REMOVE_DEVICE_FROM_DEVICE_ARRAY,
    payload: data
  })
  try {
    await factoryDataService.patch(factory_id, data)
  } catch (err) {
    console.error(err)
  }
}

export const patchThingsArrayData = (factory_id, data) => async dispatch => {
  dispatch({
    type: PATCH_FACTORY_PLINE_DATA,
    payload: data
  })
  try {
    await factoryDataService.patch(factory_id, data)
  } catch (err) {
    console.log(err)
  }
}

export const patchProductionLineData = (id, data) => async dispatch => {
  dispatch({
    type: PATCH_PRODICTION_LINE_DATA,
    payload: [id, data]
  })
  try {
    await factoryDataService.patch(id, { production_line: data })
  } catch (err) {
    console.error(err)
  }
}

export const editFactoryData = (id, data) => async dispatch => {
  try {
    await factoryDataService.patch(id, { "factory_location": data })
    dispatch({
      type: EDIT_FACTORY_LOCATION_DATA,
      payload: [id, data]
    })
  } catch (err) {
    console.log(err)
  }
}
