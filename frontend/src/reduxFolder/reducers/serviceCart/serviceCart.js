import { nanoid } from "nanoid";

if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

const initStateCart = {
    items: JSON.parse(localStorage.getItem('cart')),
    loading: false,
    error: null,
}

function serviceManageCart ( state = initStateCart, action ) {
    switch(action.type) {
        case 'ADD_ITEM_TO_CART':
            const { userSelect } = action.payload;
            const newItems = [...state.items];
            const indexExistOrder = newItems.findIndex( item => item.id === userSelect.id && item.size === userSelect.size);
            if (indexExistOrder === -1) {
                newItems.push({...userSelect, orderId: nanoid()});
            } else {
                newItems[indexExistOrder].count += userSelect.count;
            }
            localStorage.setItem('cart', JSON.stringify(newItems));
            return {...state, items: newItems};
        case 'REMOVE_ITEM_FROM_CART': 
            const { orderId } = action.payload;
            const newItems1 = state.items.filter( item => item.orderId !== orderId);
            localStorage.setItem('cart', JSON.stringify(newItems1));
            return {...state, items: newItems1};
        case 'SEND_DATA_TO_SERVER': 
            return {...state, loading: true, error: null};
        case 'ERROR_SEND_DATA':
            const { message } = action.payload;
            return {...state, loading: false, error: message};
        case 'SUCCESS_SEND_DATA':
            return {...state, loading: false, error: null};
        case 'RESET_DATA':
            localStorage.setItem('cart', JSON.stringify([]));
            return {...initStateCart, items: []};
        default:
            return state;
    }
}

export default serviceManageCart;
