import React from 'react'
import PropTypes from 'prop-types'

function AvalibleSizes(props) {
    const { list, selectedSize, handleSelectSize } = props;

    return (
        <p>Размеры в наличии: 
            {
                list.filter( item => item.avalible )
                .map(item => <span className={`catalog-item-size${selectedSize === item.size ? ' selected' : ''}`} 
                    key={item.size} 
                    onClick={() => handleSelectSize(item.size)}>{item.size}</span>)
            }
        </p>
    )
}

AvalibleSizes.propTypes = {
    list: PropTypes.array.isRequired,
    selectedSize: PropTypes.string,
    handleSelectSize: PropTypes.func.isRequired,
}

export default AvalibleSizes;

