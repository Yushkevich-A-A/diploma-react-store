import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSearchRequest } from '../../../store/catalog/actions';
import './CatalogSearch.css';

function CatalogSearch(props) {
    const { search } = useSelector( state => state.catalog );
    const dispatch = useDispatch();
    const [ searchValue, setSearchValue ] = useState(search);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addSearchRequest(searchValue));
    }

    const handleChange = (e) => {
        setSearchValue(e.target.value);
    }

    return (
        <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
            <input className="form-control" value={searchValue} onChange={handleChange} placeholder="Поиск"/>
        </form>
    )
}

export default CatalogSearch;

