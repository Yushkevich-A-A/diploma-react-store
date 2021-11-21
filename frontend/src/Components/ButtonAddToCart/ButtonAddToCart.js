import React from 'react'
import PropTypes from 'prop-types'

function ButtonAddToCart(props) {
    const { handleClick } = props;

    return (
        <button className="btn btn-danger btn-block btn-lg" onClick={handleClick}>В корзину</button>
    )
}

ButtonAddToCart.propTypes = {
    handleClick: PropTypes.func.isRequired,
}

export default ButtonAddToCart

