import React from 'react'
import PropTypes from 'prop-types'
import ButtonDelete from '../../../../Components/Buttons/ButtonDelete/ButtonDelete';
import { Link } from 'react-router-dom';
import { numberWithSpaces } from '../../../../functions/numberWithSpaces';

function CartItem(props) {

    const { item, handleDeleteOrder } = props;

    const handleClick =() => {
        handleDeleteOrder(item.orderId);
    }

    return (
        <tr>
            <th scope="row">1</th>
            <td>
                <Link to={`/catalog/${item.id}`}>{item.title}</Link>
            </td>
            <td>{item.size}</td>
            <td>{item.count}</td>
            <td>{numberWithSpaces(item.price)} руб.</td>
            <td>{numberWithSpaces(item.price * item.count)} руб.</td>
            <td>
                <ButtonDelete name={'Удалить'} handleClick={handleClick} />
            </td>
        </tr>
    )
}

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
    handleDeleteOrder: PropTypes.func.isRequired,
}

export default CartItem

