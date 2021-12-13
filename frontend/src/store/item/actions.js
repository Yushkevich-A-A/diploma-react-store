import { fetchToServer } from "../../libs/api";

export const loadingItem = () => {
    return { type: 'LOADING_ITEM' }
}

export const errorLoadingItem = (message) => {
    return { type: 'ERROR_LOADING_ITEM', payload: {message} };
}

export const itemAvaliable = () => {
    return { type: 'ITEM_AVALIABLE' };
}

export const successLoadingItem = (itemData) => {
    return { type: 'SUCCESS_LOADING_ITEM', payload: {itemData} };
}

export const resetStoreItem = () => {
    return { type: 'RESET_STORE_ITEM' };
}

export const fetchingItemData = (id, aborting) => async( dispatch, getState ) => {
    try {
        dispatch(loadingItem());
        const data = await fetchToServer(`/api/items/${id}`, aborting);
        if (data.sizes.filter( item => item.avalible).length === 0) {
            dispatch(itemAvaliable());
        }
        dispatch(successLoadingItem(data));
    } catch (e) {
        dispatch(errorLoadingItem(e.message))
    }
}