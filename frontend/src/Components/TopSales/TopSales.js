import React from 'react';
import PropTypes from 'prop-types'
import './TopSales.css';

function TopSales(props) {
    const { title } = props;

    return (
        <section className="top-sales">
            <h2 className="text-center">{title}</h2>
            {props.children}
        </section>
    )
}

TopSales.propTypes = {
    title: PropTypes.string.isRequired,
}

export default TopSales





