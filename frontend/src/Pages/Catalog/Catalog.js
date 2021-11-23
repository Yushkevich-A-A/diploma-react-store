import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FilterCatalog from './FilterCatalog/FilterCatalog';
import Loader from '../../Components/Loader/Loader';
import ItemList from '../../Components/ItemList/ItemList';
import Button from '../../Components/Button/Button';
import './Catalog.css';
import { useDispatch, useSelector } from 'react-redux';
import { dismissHeaderSearch, fetchCatalog, fetchFilters, resetFullCatalog, resetStateCatalogWithoutSearch } from '../../reduxFolder/actions/actionsCatalog/actionsCatalog';
import CatalogSearch from './CatalogSearch/CatalogSearch';

function Catalog(props) {
    const { searching } = props;
    const { loading, error, filters, search, permissioLoading } = useSelector( state => state.catalog );
    const dispatch = useDispatch();
    const [ selectedFilter, setSelectedFilter ] = useState(0);
    const [ catalog, setCatalog ] = useState([]);
    const globalAbortingController = new AbortController();

    const handleFilter = (id) => {
        setSelectedFilter(filters.find( item => item.id === id ).id)
    }

    useEffect(() => {
        if (searching) {
            dispatch(dismissHeaderSearch())
        }
        dispatch(fetchFilters(globalAbortingController));
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
        const fetchParams = {
            filter: selectedFilter,
            offset: 0,
            search: search,
        }
        loadingCatalog(fetchParams, (data) => setCatalog([...data]), abortingController);
        return () => abortingController.abort();
        // eslint-disable-next-line
    }, [selectedFilter, search]);

    const handleAddLoading = () => {
        const fetchParams = {
            filter: selectedFilter,
            offset: catalog.length,
            search: search,
        }
        loadingCatalog(fetchParams, (data) => setCatalog(prevState => ([...prevState, ...data])), globalAbortingController);
    }

    const loadingCatalog = (fetchParams, handler, aborting) => {

        dispatch(fetchCatalog(fetchParams, (data) => {
            handler(data);
        }, aborting));
    }

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            { searching && <CatalogSearch /> }
            <FilterCatalog filterList={filters} selectedFilter={selectedFilter} handleFilter={handleFilter}/>
            { loading && <Loader /> }
            { error && <p>{error}</p>  }  
            <ItemList list={catalog} />
            { permissioLoading && <Button name={'Загрузить еще'} handleClick={handleAddLoading} /> }
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

