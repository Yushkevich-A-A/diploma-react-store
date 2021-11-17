import React from 'react'
import PropTypes from 'prop-types'

function AvalibleSizes(props) {
    const { list, selectedSize, handleSelectSize } = props;
    console.log(selectedSize);


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

}

export default AvalibleSizes

