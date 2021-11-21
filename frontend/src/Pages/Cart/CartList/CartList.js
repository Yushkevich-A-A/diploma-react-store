import React from 'react'
import PropTypes from 'prop-types'
import CartItem from './CartItem/CartItem';

function CartList(props) {
    const { list, handleDeleteOrder } = props;
    
    return (
        <>
            {
                list.map( item => <CartItem key={item.orderId} item={item} handleDeleteOrder={handleDeleteOrder} />)
            }
        </>
    )
}

CartList.propTypes = {
    list: PropTypes.array.isRequired,
    handleDeleteOrder: PropTypes.func.isRequired,
}

export default CartList

