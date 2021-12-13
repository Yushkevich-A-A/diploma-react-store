const initStateCatalog = {
    filters: [{id: 0, title: 'Все'}],
    errorFilter: false,
    loadingFilters: false,
    catalog: [],
    loading: false,
    error: null,
    permissioLoading: true,
    headerSearching: true,
}

function serviceCatalog (state = initStateCatalog, action) {
    switch (action.type) {
        case 'LOADING_FILTERS': 
            return {...state, loadingFilters: true };
        case 'SUCCESS_LOADING_FILTERS': 
            const { newFilters } = action.payload;
            const filters = [...state.filters, ...newFilters ]
            return {...state, filters, loadingFilters: false, errorFilter: false };
        case 'ERROR_LOADING_FILTERS': 
            return {...state, filters, loadingFilters: false, errorFilter: true };
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
            const { catalog } = action.payload;
            return { ...state, catalog, loading: false, error: null };
        case 'SUCCESS_ADDITION_LOADING_CATALOG':
            const { additionList } = action.payload;
            const updatedCatalog = [...state.catalog, ...additionList];
            return { ...state, catalog: [...updatedCatalog], loading: false, error: null };
        case 'RESET_CATALOG':
                return { ...state, catalog: [] };
        case 'RESET_FULL_STATE':
                return { ...initStateCatalog };
        default:
            return state;
    }
}

export default serviceCatalog;