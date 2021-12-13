import { fetchToServer } from "../../libs/api";

export const loadingTopSales = () => {
    return { type: 'LOADING_TOP_SALES' };
}

export const errorLoadingTopSales = (message) => {
    return { type: 'ERROR_LOADING_TOP_SALES', payload: { message } };
}

export const successLoadingTopSales = (topSalesData) => {
    return { type: 'SUCCESS_LOADING_TOP_SALES', payload: {topSalesData}};
}

export const resetStoreTopSales = () => {
    return { type: 'RESET_STORE_TOP_LOADING' };
}

export const fetchTopSales = (aborting) => async (dispatch, getState) => {
    try {
        dispatch( loadingTopSales() );
        const data = await fetchToServer('/api/top-sales', aborting);
        dispatch(successLoadingTopSales(data));
    } catch(e) {
        dispatch(errorLoadingTopSales(e.message))
    }
}