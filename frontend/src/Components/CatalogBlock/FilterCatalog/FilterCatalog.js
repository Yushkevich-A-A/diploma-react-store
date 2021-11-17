import React from 'react';
import PropTypes from 'prop-types';
import './FilterCatalog.css';

function FilterCatalog(props) {
    const { filter, handleFilter } = props;
    const filterArr = ['Все', 'Женская обувь', 'Мужская обувь', 'Обувь унисекс', 'Детская обувь',];

    return (
        <ul className="catalog-categories nav justify-content-center">
            {
                filterArr.map( item => <li key={item} className="nav-item" onClick={() => handleFilter(item) }>
                                            <a className={`nav-link${filter === item ? ' active' : ''}`} 
                                            href="#" onClick={(e) => e.preventDefault()}>{item}</a>
                                        </li>)
            }
        </ul>
    )
}

FilterCatalog.propTypes = {

};

export default FilterCatalog;

