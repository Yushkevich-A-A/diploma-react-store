import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import serviceManageCart from './cart/reducers';
import serviceCatalog from './catalog/reducers';
import serviceLoadingItem from './item/reducers';
import serviceTopSales from './topSales/redusers';

const reducers = combineReducers({
    manageCart: serviceManageCart,
    loadingItem: serviceLoadingItem,
    topSales: serviceTopSales,
    catalog: serviceCatalog,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;