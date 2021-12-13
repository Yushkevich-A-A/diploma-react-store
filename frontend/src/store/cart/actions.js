import { createOrder } from "../../libs/api";

export const addItemToCart = (userSelect) => {
    return { type: 'ADD_ITEM_TO_CART', payload: {userSelect}};
}

export const removeItemFromCart = (orderId) => {
    return { type: 'REMOVE_ITEM_FROM_CART', payload: {orderId}};
}

export const sendDataToServer = () => {
    return { type: 'SEND_DATA_TO_SERVER'};
}

export const errorSendData = (message) => {
    return { type: 'ERROR_SEND_DATA', payload: {message}};
}

export const successSendData = () => {
    return { type: 'SUCCESS_SEND_DATA'};
}

export const resetData = () => {
    return { type: 'RESET_DATA'};
}

export const fetchDataToServer = (form) => async (dispatch, getState) => {
    try {
        dispatch(sendDataToServer());
        const itemsToServer = getState().manageCart.items.map( item => { return {id: item.id, count: item.count, price: item.price} });
        const requestObj = {
            owner: form,
            items: itemsToServer,
        };
        await createOrder(requestObj);
        dispatch(successSendData());
    } catch (e) {
        dispatch(errorSendData(e.message))
    }
}
