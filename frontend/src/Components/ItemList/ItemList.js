import React from 'react'
import PropTypes from 'prop-types'
import ItemPage from '../../Pages/ItemPage/ItemPage';
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

}

export default ItemList

