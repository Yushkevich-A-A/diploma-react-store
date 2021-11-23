import React from 'react';
import PropTypes from 'prop-types';
import './FilterCatalog.css';

function FilterCatalog(props) {
    const { selectedFilter, filterList, handleFilter } = props;

    return (
        <ul className="catalog-categories nav justify-content-center">
            {
                filterList.map( item => <li key={item.id} className="nav-item">
                                            <a className={`nav-link${selectedFilter === item.id? ' active' : ''}`} 
                                            href="#0" onClick={(e) => {
                                                e.preventDefault();
                                                handleFilter(item.id);
                                                }}>{item.title}</a>
                                        </li>)
            }
        </ul>
    )
}

FilterCatalog.propTypes = {
    selectedFilter: PropTypes.number.isRequired,
    filterList: PropTypes.array.isRequired,
    handleFilter: PropTypes.func.isRequired,
};

export default FilterCatalog;

