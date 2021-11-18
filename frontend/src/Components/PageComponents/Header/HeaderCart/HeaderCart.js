import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderCart.css';

function HeaderCart(props) {

    const arrItemsInCart = JSON.parse(localStorage.getItem('cart')).length;
    console.log(arrItemsInCart)

    return (
        <Link to='/cart'>
            <div className="header-controls-pic header-controls-cart">
                { !!arrItemsInCart &&  <div className="header-controls-cart-full">{arrItemsInCart}</div> }
                <div className="header-controls-cart-menu"></div>
            </div>
        </Link>
    )
}

export default HeaderCart;

