import React from 'react';
import PropTypes from 'prop-types';
import './MessageSuccess.css';

function MessageSuccess(props) {
    return (
        <div className='message-wrapper'>
            <div className="message-success">
                Заказ оформлен успешно
            </div>
        </div>
    )
}

MessageSuccess.propTypes = {

};

export default MessageSuccess;

