import React from 'react';
import { Link } from 'react-router-dom';
import './HeaderCart.css';

function HeaderCart(props) {
    return (
        <Link to='/cart'>
            <div className="header-controls-pic header-controls-cart">
                <div className="header-controls-cart-full">2</div>
                <div className="header-controls-cart-menu"></div>
            </div>
        </Link>
    )
}

export default HeaderCart;

