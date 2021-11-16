import { NavLink, Link } from 'react-router-dom';
import React from 'react';
import logo from './img/header-logo.png';
import './Header.css';
import HeaderControlsPics from './HeaderControlsPics/HeaderControlsPics';
import HeaderCart from './HeaderCart/HeaderCart';

function Header(props) {
    // const activeStyle = {color: '#ff0000'}

    return (
    <header className="container">
        <div className="row">
            <div className="col">
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="Bosa Noga"/>
                    </Link>
                    <div className="collapase navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <NavLink exact to="/" className="nav-link" >Главная</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/catalog" className="nav-link" >Каталог</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link" >О магазине</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contacts" className="nav-link" >Контакты</NavLink>
                            </li>
                        </ul>
                        <HeaderControlsPics>
                            <HeaderCart />
                        </HeaderControlsPics>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    )
}

export default Header;