import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {UserReducer} from './UserReducer'
const middleware=[thunk];
const reducer=combineReducers({
    UserReducer
});
const store=createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware)))

export default store;   