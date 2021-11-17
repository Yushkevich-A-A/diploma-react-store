import React from 'react';
import PropTypes from 'prop-types';
import CatalogBlock from '../../Components/CatalogBlock/CatalogBlock';

function Catalog(props) {
    return (
        <CatalogBlock title={'Каталог'} search={true}/>
    )
}

Catalog.propTypes = {

}

export default Catalog;

