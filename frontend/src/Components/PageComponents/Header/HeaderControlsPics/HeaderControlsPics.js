import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './HeaderControlsPics.css';

function HeaderControlsPics(props) {
    const history = useHistory()
    const { headerSearching } = useSelector( state => state.catalog);
    const [ visiableSearch, setVisiableSearch ] = useState(false);
    const [ value, setValue ] = useState('');

    useEffect(() => {
        if (visiableSearch) {
            setVisiableSearch(false);
        }
        // eslint-disable-next-line
    }, [headerSearching])

    const handleChange = (e) => {
        setValue(e.target.value);
    }

    const handleClick = () => {
        if (!headerSearching) {
            return;
        }
        setVisiableSearch(prevState => !prevState);
        if ( value.trim() !== '' ) {
            setValue('');
            history.push(`/catalog${qs.stringify({ q: value }, { addQueryPrefix: true, skipNulls: true })}`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( value.trim() === '' ) {
            return;
        }
        setVisiableSearch(false);
        setValue('');
        history.push(`/catalog${qs.stringify({ q: value }, { addQueryPrefix: true, skipNulls: true })}`);
    }

    return (
        <div>
            <div className="header-controls-pics">
                <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleClick}></div>
                {props.children}
            </div>
            <form className={`header-controls-search-form form-inline${!visiableSearch && ' invisible'}`} onSubmit={handleSubmit} >
                <input className="form-control" placeholder="Поиск" value={value} onChange={handleChange}/>
            </form>
        </div>
    )
}

export default HeaderControlsPics;

