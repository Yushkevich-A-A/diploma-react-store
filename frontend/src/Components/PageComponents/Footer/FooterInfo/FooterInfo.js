import React from 'react';
import { Link } from 'react-router-dom';

function FooterInfo(props) {
    return (
        <section>
            <h5>Информация</h5>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <Link to="/about" className="nav-link">О магазине</Link>
                    </li>
                <li className="nav-item">
                    <Link to="/catalog" className="nav-link">Каталог</Link>
                    </li>
                <li className="nav-item">
                    <Link to="/contacts" className="nav-link">Контакты</Link>
                    </li>
            </ul>
        </section>
    )
}

export default FooterInfo

