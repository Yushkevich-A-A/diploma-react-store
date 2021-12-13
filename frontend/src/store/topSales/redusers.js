const initStateTopSales = {
    loading: false,
    error: null,
    topSalesData: null,
}

function serviceTopSales (state = initStateTopSales, action) {
    switch ( action.type) {
        case 'LOADING_TOP_SALES':
            return {...state, loading: true, error: null};
        case 'ERROR_LOADING_TOP_SALES':
            const { message } = action.payload;
            return {...state, loading: false, error: message};
        case 'SUCCESS_LOADING_TOP_SALES':
            const { topSalesData } = action.payload;
            return {...state, topSalesData, loading: false, error: null};
        case 'RESET_STORE_TOP_LOADING':
            return {...initStateTopSales};
        default: 
            return state;
    }
}

export default serviceTopSales;