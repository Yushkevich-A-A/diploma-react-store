import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item/Item';

function ItemList(props) {
    const { list } = props;

    return (
        <div className="row">
            {
                list.map( item => <Item key={item.id} item={item} />)
            }
        </div>
    )
}

ItemList.propTypes = {
    list: PropTypes.array.isRequired,
}

export default ItemList

