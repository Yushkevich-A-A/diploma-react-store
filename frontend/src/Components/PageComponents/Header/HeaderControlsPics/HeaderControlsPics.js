import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { addSearchRequest } from '../../../../store/catalog/actions';
import './HeaderControlsPics.css';

function HeaderControlsPics(props) {
    const history = useHistory()
    const { headerSearching } = useSelector( state => state.catalog);
    const dispatch = useDispatch();
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
            // dispatch(addSearchRequest(value))
            setValue('');
            history.push(`/catalog?q=${value}`)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if ( value.trim() === '' ) {
            return;
        }
        // dispatch(addSearchRequest(value))
        setVisiableSearch(false);
        setValue('');
        history.push(`/catalog?q=${value}`)
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

