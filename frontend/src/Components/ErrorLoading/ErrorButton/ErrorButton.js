import React from 'react';
import PropTypes from 'prop-types';
import './ErrorButton.css';

function ErrorButton(props) {
    const { handlerRepeatRequest } = props;
    return (
        <button className='error-button' onClick={handlerRepeatRequest}>
            Попробовать снова
        </button>
    )
}

ErrorButton.propTypes = {

};

export default ErrorButton;

