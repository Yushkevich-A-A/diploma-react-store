import React from 'react'
import PropTypes from 'prop-types'

function Search(props) {
    return (
        <form data-id="search-form" className="header-controls-search-form form-inline invisible">
            <input className="form-control" placeholder="Поиск" />
        </form>
    )
}

Search.propTypes = {

}

export default Search

