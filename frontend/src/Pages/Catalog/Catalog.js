import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import FilterCatalog from './FilterCatalog/FilterCatalog';
import Loader from '../../Components/Loaders/Loader/Loader';
import ItemList from '../../Components/ItemList/ItemList';
import Button from '../../Components/Buttons/Button/Button';
import './Catalog.css';
import { dismissHeaderSearch, fetchCatalog, fetchFilters, resetFullCatalog, resetStateCatalogWithoutSearch } from '../../reduxFolder/actions/actionsCatalog/actionsCatalog';
import CatalogSearch from './CatalogSearch/CatalogSearch';
import ErrorLoading from '../../Components/ErrorLoading/ErrorLoading';
import EmptySearch from '../../Components/EmptySearch/EmptySearch';

function Catalog(props) {
    const { searching } = props;
    const { loading, error, filters, loadingFilters, search, permissioLoading } = useSelector( state => state.catalog );
    const dispatch = useDispatch();
    const [ selectedFilter, setSelectedFilter ] = useState(0);
    const [ catalog, setCatalog ] = useState([]);
    const [ isEmptySearch, setEmptySearch ] = useState(false)
    const globalAbortingController = new AbortController();

    const handleFilter = (id) => {
        setSelectedFilter(filters.find( item => item.id === id ).id)
    }

    useEffect(() => {
        if (searching) {
            dispatch(dismissHeaderSearch())
        }
        loadingFilter();
        return () => {
            globalAbortingController.abort();
            if (searching) {
                dispatch(resetFullCatalog());
                return;
            }
            dispatch(resetStateCatalogWithoutSearch());
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        const abortingController = new AbortController();
        setEmptySearch(false);
        loadingCatalog(0, (data) => {
            if (data.length === 0) {
                setEmptySearch(true);
            }
            setCatalog([...data])
        }, abortingController);
        return () => {
            abortingController.abort();
            setCatalog([]);
        }
        // eslint-disable-next-line
    }, [selectedFilter, search]);

    const handleAddLoading = () => {
        setEmptySearch(false);
        loadingCatalog(catalog.length, (data) => {
            if (data.length === 0 && catalog.length === 0) {
                setEmptySearch(true);
            }
            setCatalog(prevState => ([...prevState, ...data]))
        }, globalAbortingController);
    }

    const loadingFilter = () => {
        dispatch(fetchFilters(globalAbortingController,() => setTimeout(loadingFilter, 5 * 1000)));
    }

    const loadingCatalog = (offset, handler, aborting) => {
        const fetchParams = {
            filter: selectedFilter,
            offset,
            search: search,
        }
        dispatch(fetchCatalog(fetchParams, (data) => handler(data), aborting));
    }

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            { searching && <CatalogSearch /> }
            <FilterCatalog filterList={filters} 
                selectedFilter={selectedFilter} 
                handleFilter={handleFilter}
                loading={loadingFilters}/>
            <ItemList list={catalog} />
            { searching && isEmptySearch && <EmptySearch />}
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

