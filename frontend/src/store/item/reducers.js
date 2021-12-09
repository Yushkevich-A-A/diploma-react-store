const initStateItem = {
    loading: false,
    error: null,
    avaliable: true,
}

function serviceLoadingItem ( state = initStateItem, action ) {
    switch(action.type) {
        case 'LOADING_ITEM':
            return {...state, loading: true, error: null};
        case 'ERROR_LOADING_ITEM': 
            const { message } = action.payload;
            return {...state, loading: false, error: message};
        case 'ITEM_AVALIABLE': 
            return {...state, avaliable: false};
        case 'SUCCESS_LOADING_ITEM': 
            return {...state, loading: false, error: null};
        case 'RESET_STORE_ITEM': 
            return {...initStateItem};
        default:
            return state;
    }
}

export default serviceLoadingItem;