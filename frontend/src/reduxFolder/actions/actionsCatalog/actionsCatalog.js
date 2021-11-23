export const addSearchRequest = (search) => {
    return { type: 'ADD_SEARCH_REQUEST', payload: { search } };
}

export const addFilters = (newFilters) => {
    return { type: 'ADD_FILTERS', payload: { newFilters } };
}

export const permissionButtonAdd = (permissioLoading) => {
    return { type: 'PREMISSION_BUTTON_ADD', payload: { permissioLoading } };
}

export const dismissHeaderSearch = () => {
    return { type: 'DISMISS_HEADER_SEARCH'};
}

export const loadingCatalog = () => {
    return { type: 'LOADING_CATALOG' };
}

export const errorLoadingCatalog = (message) => {
    return { type: 'ERROR_LOADING_CATALOG', payload: { message } };
}

export const successLoadingCatalog = () => {
    return { type: 'SUCCESS_LOADING_CATALOG' };
}

export const resetFullCatalog = () => {
    console.log('сброс каталога')
    return { type: 'RESET_FULL_STATE' };
}

export const resetStateCatalogWithoutSearch = () => {
    return { type: 'RESET_STATE_CATALOG_WITHOUT_SEARCH' };
}

export const fetchFilters = (aborting) => async (dispatch, getState) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/categories`, {
            signal: aborting.signal,
        });
        const data = await response.json();
        dispatch(addFilters(data));
    } catch (e) {
        console.log(e.message);
    }
}

export const fetchCatalog = (requestData, handler, aborting) => async (dispatch, getState) => {
    try {
        dispatch(permissionButtonAdd(false));
        const {filter, offset, search} = requestData;
        dispatch( loadingCatalog() );
        const urlRequest = new URLSearchParams();
        if ( filter !== 0) {
            urlRequest.append('categoryId', filter);
        }
        if ( offset !== 0) {
            urlRequest.append('offset', offset);
        }
        if ( search !== '') {
            urlRequest.append('q', search);
        }
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/items?${urlRequest}`, {
            signal: aborting.signal,
        });
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        dispatch(successLoadingCatalog());
        if (data.length >= 6) {
            dispatch(permissionButtonAdd(true));
        }
        handler(data);
    } catch(e) {
        console.log(e.message);
        dispatch(errorLoadingCatalog(e.message))
    }
}