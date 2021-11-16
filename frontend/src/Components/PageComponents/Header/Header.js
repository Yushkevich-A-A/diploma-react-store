import { NavLink, Link } from 'react-router-dom';
import React from 'react';
import logo from './img/header-logo.png';
import './Header.css';

function Header(props) {
    const activeStyle = {color: '#ff0000'}

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
                                <NavLink exact to="/" className="nav-link" activeStyle={activeStyle}>Главная</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/catalog" className="nav-link" activeStyle={activeStyle}>Каталог</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className="nav-link" activeStyle={activeStyle}>О магазине</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contacts" className="nav-link" activeStyle={activeStyle}>Контакты</NavLink>
                            </li>
                        </ul>
                        <div>
                            <div className="header-controls-pics">
                                <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                                {/* { Do programmatic navigation on click to /cart.html } */}
                                <div className="header-controls-pic header-controls-cart">
                                    <div className="header-controls-cart-full">1</div>
                                    <div className="header-controls-cart-menu"></div>
                                </div>
                            </div>
                            <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                                <input className="form-control" placeholder="Поиск" />
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
    )
}

export default Header;