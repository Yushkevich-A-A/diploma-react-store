import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FilterCatalog from './FilterCatalog/FilterCatalog';
import './CatalogBlock.css';


function CatalogBlock(props) {
    const { title, search } = props;
    const [ valueFilter, setValueFilter ] = useState('Все');

    const handleFilter = (value) => {
        setValueFilter(value);
    }


    return (
        <section className="catalog">
            <h2 className="text-center">{title}</h2>
            { console.log(search) }
            <FilterCatalog filter={valueFilter} handleFilter={handleFilter}/>
            {props.children}

        </section>
    )
}

CatalogBlock.propTypes = {
    title: PropTypes.string.isRequired,
}

export default CatalogBlock;

