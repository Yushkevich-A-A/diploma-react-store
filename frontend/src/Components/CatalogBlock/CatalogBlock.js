import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FilterCatalog from './FilterCatalog/FilterCatalog';
import './CatalogBlock.css';
import Loader from '../Loader/Loader';
import ItemList from '../ItemList/ItemList';
import Button from '../Buttons/Button';


function CatalogBlock(props) {
     
    const { title, search } = props;
    const [ filters, setFilters ] = useState([{id: 0, title: 'Все',}]);
    const [ selectedFilter, setSelectedFilter ] = useState(0);
    const [ catalog, setCatalog ] = useState([]);
    const [ permissioLoading, setPermissionLoading ] = useState(true);
    // const [ search, setSearch ] = useState('');

    const handleFilter = (id) => {
        setSelectedFilter(filters.find( item => item.id === id ).id)
    }

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/categories`)
            .then( resp => resp.json()) 
            .then( data => setFilters( prevState => [...prevState, ...data] ))
            .catch( e => console.log('Ошибка'))
    }, []);


    useEffect(() => {
        setPermissionLoading(true)
        loadRequest((data) => {setCatalog([...data])}, selectedFilter);
    }, [selectedFilter]);


    const handleAddLoading = () => {
        loadRequest((data) => {setCatalog(prevState => [...prevState, ...data])}, selectedFilter, catalog.length)
    }

    const loadRequest = (handler, filter = 0, offset = 0, search = '') => {
        const urlRequest = new URLSearchParams();

        if ( filter !== 0) {
            urlRequest.append('categoryId', filter);
        }

        if ( offset !== 0) {
            urlRequest.append('offset', offset);
        }

        if ( search !== '') {
            urlRequest.append('search', search);
        }

        fetch(`${process.env.REACT_APP_SERVER_URL}/api/items?${urlRequest}`)
            .then( resp => resp.json()) 
            .then( data => {
                if (data.length < 6) {
                    setPermissionLoading(false);
                }
                handler(data)
            })
            .catch( e => console.log('Ошибка'))
    }

    return (
        <section className="catalog">
            <h2 className="text-center">{title}</h2>
            {catalog.length === 0 && <Loader />}
            {
               catalog.length !== 0 && <FilterCatalog filterList={filters} selectedFilter={selectedFilter} handleFilter={handleFilter}/>
            }
            <ItemList list={catalog} />
            { permissioLoading && <Button name={'Загрузить еще'} handleClick={handleAddLoading} /> }
        </section>
    )
}

CatalogBlock.propTypes = {
    title: PropTypes.string.isRequired,
}

export default CatalogBlock;

