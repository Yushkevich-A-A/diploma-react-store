import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import FilterCatalog from './FilterCatalog/FilterCatalog';
import Loader from '../../Components/Loaders/Loader/Loader';
import ItemList from '../../Components/ItemList/ItemList';
import Button from '../../Components/Buttons/Button/Button';
import { dismissHeaderSearch, fetchAddingCatalog, fetchCatalog, fetchFilters, resetFullCatalog } from '../../store/catalog/actions';
import CatalogSearch from './CatalogSearch/CatalogSearch';
import ErrorLoading from '../../Components/ErrorLoading/ErrorLoading';
import EmptySearch from '../../Components/EmptySearch/EmptySearch';
import './Catalog.css';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';

function Catalog(props) {
    const { searching } = props;
    const match = useRouteMatch();
    const history = useHistory();
    const location = useLocation();
    const { loading, error, filters, catalog, loadingFilters, permissioLoading } = useSelector( state => state.catalog );
    const dispatch = useDispatch();
    const [ selectedParametres, setSelectedParametres ] = useState({ categoryId: 0, q: null});
    const [ aborting, setAbortingController ] = useState({abortingController: new AbortController()});
    const globalAbortingController = new AbortController();

    const handleFilter = (id) => {
        setSelectedParametres(prevState => ({...prevState, categoryId: id }));
    }

    const handleSearchValue = (value) => {
        setSelectedParametres(prevState => ({...prevState, q: value || null }));
    }

    useEffect(() => {
        if (searching) {
            dispatch(dismissHeaderSearch())
        }
        dispatch(fetchFilters(globalAbortingController));

        const initSelectedValue = qs.parse( location.search, { ignoreQueryPrefix: true} );
        setSelectedParametres(prevState => ({
            ...prevState, 
            categoryId: +initSelectedValue.categoryId || 0,
            q: initSelectedValue.q || null,
        }))

        dispatch(fetchCatalog(location.search, globalAbortingController));

        return () => {
            dispatch(resetFullCatalog());
            globalAbortingController.abort();
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const abortingController = new AbortController();
        aborting.abortingController.abort();
        const urlReq = qs.stringify(selectedParametres, { addQueryPrefix: true, skipNulls: true });
        history.push(`${match.url}${urlReq}`);
        dispatch(fetchCatalog(urlReq, abortingController));
        return () => abortingController.abort();
        // eslint-disable-next-line
    }, [selectedParametres]);

    const handleAddLoading = () => {
        const abortingController = new AbortController()
        setAbortingController(prevState => ({...prevState, abortingController }));
        const request = qs.stringify({...selectedParametres, offset: catalog.length}, { addQueryPrefix: true, skipNulls: true });
        dispatch(fetchAddingCatalog(request, abortingController));
    }

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            { searching && <CatalogSearch search={selectedParametres.q} handleSearchValue={handleSearchValue}/> }
            <FilterCatalog filterList={filters} 
                selectedFilter={selectedParametres.categoryId} 
                handleFilter={handleFilter}
                loading={loadingFilters}/>
            <ItemList list={catalog} />
            { !loading && !error && catalog.length === 0 && <EmptySearch />}
            { permissioLoading && <Button name={'Загрузить еще'} handleClick={handleAddLoading} /> }
            { loading && <Loader /> }
            { error && <ErrorLoading error={error} handlerRepeatRequest={handleAddLoading} /> } 
        </section>
    )
}

Catalog.defaultProps = {
    searching: true,
}

Catalog.propTypes = {
    searching: PropTypes.bool,
}

export default Catalog;

