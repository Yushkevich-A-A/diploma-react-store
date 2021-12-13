import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './HeaderCart.css';

function HeaderCart() {
    const { items } = useSelector( state => state.manageCart );
    
    return (
        <Link to='/cart'>
            <div className="header-controls-pic header-controls-cart">
                { items.length !== 0 &&  <div className="header-controls-cart-full">{items.length}</div> }
                <div className="header-controls-cart-menu"></div>
            </div>
        </Link>
    )
}

export default HeaderCart;

