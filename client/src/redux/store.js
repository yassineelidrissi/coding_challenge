import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { sectorsListReducer, sectorCreateReducer, sectorDetailsReducer, sectorUpdateReducer, sectorDeleteReducer, sectorListDataReducer } from './user/userReducers';

const reducer = combineReducers({
    sectorsList: sectorsListReducer,
    sectorListData: sectorListDataReducer,
    sectorCreate: sectorCreateReducer,
    sectorDetails: sectorDetailsReducer,
    sectorUpdate: sectorUpdateReducer,
    sectorDeleteReducer: sectorDeleteReducer
});

const intialState = {};

const middleware = [thunk];

const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;