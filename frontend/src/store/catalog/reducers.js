const initStateCatalog = {
    filters: [{id: 0, title: 'Все'}],
    loadingFilters: false,
    search: '',
    loading: false,
    error: null,
    permissioLoading: true,
    headerSearching: true,
}

function serviceCatalog (state = initStateCatalog, action) {
    switch (action.type) {
        case 'ADD_SEARCH_REQUEST': 
            const { search } = action.payload;
            return {...state, search};
        case 'ADD_FILTERS': 
            const { newFilters } = action.payload;
            return {...state, filters: [...state.filters, ...newFilters ] };
        case 'LOADING_FILTERS': 
            return {...state, loadingFilters: true };
        case 'SUCCESS_LOADING_FILTERS': 
            return {...state, loadingFilters: false };
        case 'PREMISSION_BUTTON_ADD': 
            const { permissioLoading } = action.payload;
            return {...state, permissioLoading };
        case 'DISMISS_HEADER_SEARCH': 
            return {...state, headerSearching: false}
        case 'LOADING_CATALOG':
            return {...state, loading: true, error: null };
        case 'ERROR_LOADING_CATALOG':
            const { message } = action.payload;
            return {...state, loading: false, error: message};
        case 'SUCCESS_LOADING_CATALOG':
            return { ...state, loading: false, error: null };
        case 'RESET_STATE_CATALOG_WITHOUT_SEARCH':
            const searchReq = state.search;
            return { ...initStateCatalog, search: searchReq };
        case 'RESET_FULL_STATE':
                return { ...initStateCatalog };
        default:
            return state;
    }
}

export default serviceCatalog;