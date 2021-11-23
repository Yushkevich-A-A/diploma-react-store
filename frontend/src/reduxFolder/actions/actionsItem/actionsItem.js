export const loadingItem = () => {
    return { type: 'LOADING_ITEM' }
}

export const errorLoadingItem = (message) => {
    return { type: 'ERROR_LOADING_ITEM', payload: {message} };
}

export const itemAvaliable = () => {
    return { type: 'ITEM_AVALIABLE' };
}

export const successLoadingItem = () => {
    return { type: 'SUCCESS_LOADING_ITEM' };
}

export const resetStoreItem = () => {
    return { type: 'RESET_STORE_ITEM' };
}

export const fetchingItemData = ( id, handler, aborting ) => async( dispatch, getState ) => {
    try {
        dispatch(loadingItem());
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/items/${id}`,{
            signal: aborting.signal,
        });
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        if (data.sizes.filter( item => item.avalible).length === 0) {
            dispatch(itemAvaliable());
        }
        dispatch(successLoadingItem());
        handler(data);
    } catch (e) {
        dispatch(errorLoadingItem(e.message))
    }
}