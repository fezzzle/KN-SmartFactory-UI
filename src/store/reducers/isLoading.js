import { SET_LOADING } from "../actions/types";


const isLoadingReducer = (state = {isLoading: false}, action) => {
    console.log('action.payload: INSIDE LOADING REDUCER:', action.payload)
    console.log('state: INSIDE LOADING REDUCER', state)
    switch (action.type) {
        case SET_LOADING:
            return {...state.isLoading, isLoading: action.payload}
        default:
            return state;
    }
};

export default isLoadingReducer;
