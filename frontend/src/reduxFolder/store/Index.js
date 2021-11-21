import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import serviceManageCart from '../reducers/serviceCart/serviceCart';
import thunk from 'redux-thunk';

const reducers = combineReducers({
    manageCart: serviceManageCart,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;