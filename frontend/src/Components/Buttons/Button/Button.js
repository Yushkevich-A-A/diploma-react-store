import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button(props) {
    const { name, handleClick } = props; 

    return (
        <div className="text-center" onClick={handleClick}>
            <button className="btn btn-outline-primary">
                {name}
            </button>
        </div>
    )
}

Button.propTypes = {
    name: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default Button;

