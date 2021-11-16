import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

function Loader(props) {
    return (
        <div className="preloader">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    )
}

Loader.propTypes = {

}

export default Loader

