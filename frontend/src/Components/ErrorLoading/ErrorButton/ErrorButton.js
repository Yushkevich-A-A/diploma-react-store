import React from 'react';
import './ErrorButton.css';

function ErrorButton(props) {
    const { handlerRepeatRequest } = props;
    return (
        <button className='error-button' onClick={handlerRepeatRequest}>
            Попробовать снова
        </button>
    )
}

export default ErrorButton;

