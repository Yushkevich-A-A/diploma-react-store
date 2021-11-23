import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import serviceManageCart from '../reducers/serviceCart/serviceCart';
import serviceCatalog from '../reducers/serviceCatalog/serviceCatalog';
import serviceLoadingItem from '../reducers/serviceItem/serviceItem';
import serviceTopSales from '../reducers/serviceTopSales/serviceTopSales';

const reducers = combineReducers({
    manageCart: serviceManageCart,
    loadingItem: serviceLoadingItem,
    topSales: serviceTopSales,
    catalog: serviceCatalog,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;