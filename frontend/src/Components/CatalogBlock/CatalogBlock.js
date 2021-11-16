import React from 'react';
import PropTypes from 'prop-types';
import './CatalogBlock.css';

function CatalogBlock(props) {
    const { title } = props;

    return (
        <section className="catalog">
            <h2 className="text-center">{title}</h2>
            {props.children}
        </section>
    )
}

CatalogBlock.propTypes = {
    title: PropTypes.string.isRequired,
}

export default CatalogBlock;

