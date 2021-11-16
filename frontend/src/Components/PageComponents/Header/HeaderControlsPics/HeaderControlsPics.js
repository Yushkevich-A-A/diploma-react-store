import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './HeaderControlsPics.css';

function HeaderControlsPics(props) {
    const [ redirect, setRedirect ] = useState(false);
    const [ visiableSearch, setVisiableSearch ] = useState(false);
    const [ value, setValue ] = useState('');

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleClick = () => {
        setRedirect(false);
        setVisiableSearch(prevState => !prevState);
        if ( value.trim() !== '' ) {
            // ////////////////////////////////////////
            console.log('Отправляем данные в диспатч');
            setValue('');
            setRedirect(true);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( value.trim() === '' ) {
            return;
        }
        setVisiableSearch(false);
        setValue('');
        setRedirect(true);
    }

    return (
        <div>
            <div className="header-controls-pics">
                <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleClick}></div>
                {/* { Do programmatic navigation on click to /cart.html } */}
                {props.children}
            </div>
            <form className={`header-controls-search-form form-inline${!visiableSearch && ' invisible'}`} onSubmit={handleSubmit} >
                <input className="form-control" placeholder="Поиск" value={value} onChange={handleChange}/>
            </form>
            {redirect && <Redirect to='/catalog' />}
        </div>
    )
}

export default HeaderControlsPics;

