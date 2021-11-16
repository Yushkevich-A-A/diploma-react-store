import React from 'react';
import './TopSales.css';

function TopSales(props) {
    return (
        <section className="top-sales">
            {props.children}
        </section>
    )
}

export default TopSales

