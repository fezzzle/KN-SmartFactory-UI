
import { fetchFactoryData } from "../../store/actions/actions"
import { RECEIVE_FACTORY_DATA } from "../../store/actions/types"
import dataForTesting from "./data.json"
import axiosInstance from "../../services/http-common"
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from "axios"
import MockAdapter from "axios-mock-adapter"



const middlewares = [thunk] // add your middlewares like `redux-thunk`
const mock = new MockAdapter(axiosInstance);
const mockStore = configureStore(middlewares)
const store = mockStore({});

describe('actions', () => {
    beforeEach(() => {
        mock.reset();
        store.clearActions();
    });

    it('fetch all factory data', async () => {
        const expectedActions = [{ type: 'RECEIVE_FACTORY_DATA' , "payload": []}]

        mock.onGet('/factory_api').reply(200, []);

        await store.dispatch(fetchFactoryData());
        const receivedActions = store.getActions();
        console.log('receivedActions:', receivedActions)
        expect(receivedActions).toEqual(expectedActions);
    });
});
