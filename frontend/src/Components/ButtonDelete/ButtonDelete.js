import React from 'react'
import PropTypes from 'prop-types'

function ButtonDelete(props) {
    const { name, handleClick } = props;
    return (
        <button className="btn btn-outline-danger btn-sm" onClick={handleClick}>{name}</button>
    )
}

ButtonDelete.propTypes = {
    name: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
}

export default ButtonDelete;

