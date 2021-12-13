import React from 'react';
import './ErrorLoading.css';
import ErrorButton from './ErrorButton/ErrorButton';

function ErrorLoading(props) {
    const { error, handlerRepeatRequest } = props;
    return (
        <div className="loading-error-wrapper">
            <div className='loading-error'>
                <span className='error-text'>{ error }</span>
                <ErrorButton handlerRepeatRequest={handlerRepeatRequest}/>
            </div>            
        </div>

    )
}

export default ErrorLoading;

