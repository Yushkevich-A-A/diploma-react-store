import { fetchToServer } from '../../libs/api';

// export const addSearchRequest = (search) => {
//     return { type: 'ADD_SEARCH_REQUEST', payload: { search } };
// }

export const loadingFilters = () => {
    return { type: 'LOADING_FILTERS' };
}

export const successLoadingFilters = (newFilters) => {
    return { type: 'SUCCESS_LOADING_FILTERS', payload: { newFilters } };
}

export const errorLoadingFilters = () => {
    return { type: 'ERROR_LOADING_FILTERS'};
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

export const successLoadingCatalog = (catalog) => {
    return { type: 'SUCCESS_LOADING_CATALOG', payload: {catalog} };
}

export const successAdditionLoadingCatalog = (additionList) => {
    return { type: 'SUCCESS_ADDITION_LOADING_CATALOG', payload: {additionList}};
}

export const resetFullCatalog = () => {
    return { type: 'RESET_FULL_STATE' };
}

export const resetCatalog = () => {
    return { type: 'RESET_CATALOG' };
}

export const fetchFilters = (aborting) => async (dispatch, getState) => {
    try {
        dispatch(loadingFilters())
        const data = await fetchToServer(`/api/categories`, aborting);
        dispatch(successLoadingFilters(data))
    } catch (e) {
        setTimeout(() => {
            dispatch(fetchFilters(aborting));
        }, 1000 * 5);
    }
}

export const fetchCatalog = (urlRequest, aborting) => async (dispatch, getState) => {
    try {
        dispatch(permissionButtonAdd(false));
        dispatch( resetCatalog() );
        dispatch( loadingCatalog() );
        const data = await fetchToServer(`/api/items${urlRequest}`, aborting);
        if (data.length >= 6) {
            dispatch(permissionButtonAdd(true));
        }
        dispatch(successLoadingCatalog(data));
    } catch(e) {
        if (e.message === 'The user aborted a request.') {
            return;
        }
        dispatch(errorLoadingCatalog(e.message))
    }
}

export const fetchAddingCatalog = (urlRequest, aborting) => async (dispatch, getState) => {
    try {
        dispatch(permissionButtonAdd(false));
        dispatch( loadingCatalog());
        const data = await fetchToServer(`/api/items${urlRequest}`, aborting);
        if (data.length >= 6) {
            dispatch(permissionButtonAdd(true));
        }
        dispatch(successAdditionLoadingCatalog(data));
    } catch(e) {
        if (e.message === 'The user aborted a request.') {
            return;
        }
        dispatch(errorLoadingCatalog(e.message))
    }
}