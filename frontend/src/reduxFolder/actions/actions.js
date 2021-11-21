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

export const fetchDataToServer = (form, handler, aborting) => async (dispatch, getState) => {
    try {
        dispatch(sendDataToServer());
        const itemsToServer = getState().items.map( item => { return {id: item.id, count: item.count, price: item.price} });
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/order`, {
                method: 'POST',
                body: JSON.stringify({
                    owner: form,
                    items: itemsToServer,
                }),
                headers: {'Content-type':'application/json'},
            })
        
            console.log(response)
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText)
        }
        dispatch(successSendData());
        handler(aborting)
        

    } catch (e) {
        dispatch(errorSendData(e.message))
    }
    
}