import React, { useEffect, useState } from 'react';
import './CatalogSearch.css';

function CatalogSearch(props) {
    const { search, handleSearchValue } = props;
    const [ searchValue, setSearchValue ] = useState('');

    useEffect(() => {
        setSearchValue(search || '');
        // eslint-disable-next-line
    }, [search])

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearchValue(searchValue);
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

