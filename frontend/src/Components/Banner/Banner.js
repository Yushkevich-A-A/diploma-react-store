import React from 'react';
import PropTypes from 'prop-types';
import banner from './img/banner.jpg';

function Banner(props) {
    return (
        <div className="banner">
            <img src={banner} className="img-fluid" alt="К весне готовы!"/>
            <h2 className="banner-header">К весне готовы!</h2>
        </div>
    )
}

Banner.propTypes = {

}

export default Banner

