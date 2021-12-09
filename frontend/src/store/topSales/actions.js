export const loadingTopSales = () => {
    return { type: 'LOADING_TOP_SALES' };
}

export const errorLoadingTopSales = (message) => {
    return { type: 'ERROR_LOADING_TOP_SALES', payload: { message } };
}

export const successLoadingTopSales = () => {
    return { type: 'SUCCESS_LOADING_TOP_SALES' };
}

export const resetStoreTopSales = () => {
    return { type: 'RESET_STORE_TOP_LOADING' };
}

export const fetchTopSales = (handler, aborting) => async (dispatch, getState) => {
    try {
        dispatch( loadingTopSales() );
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/top-sales`, {
            signal: aborting.signal,
        });
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        dispatch(successLoadingTopSales());
        handler(data);
    } catch(e) {
        dispatch(errorLoadingTopSales(e.message))
    }
}