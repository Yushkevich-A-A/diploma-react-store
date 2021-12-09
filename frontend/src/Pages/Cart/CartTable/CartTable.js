import React from 'react';
import PropTypes from 'prop-types';
import { numberWithSpaces } from '../../../libs/numberWithSpaces';

function CartTable(props) {
    const { items } = props;

    const getAmountSum = () => {
        return numberWithSpaces(items.reduce( (acc, sum) => sum.price * sum.count + acc, 0));
    };

    return (
        <table className="table table-bordered">
        <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Название</th>
                <th scope="col">Размер</th>
                <th scope="col">Кол-во</th>
                <th scope="col">Стоимость</th>
                <th scope="col">Итого</th>
                <th scope="col">Действия</th>
            </tr>
        </thead>
        <tbody>
            {props.children}
            <tr>
                <td colSpan="5" className="text-right">Общая стоимость</td>
                <td>{getAmountSum()} руб.</td>
            </tr>
        </tbody>
    </table>
    )
}

CartTable.propTypes = {
    items: PropTypes.array.isRequired
}

export default CartTable;

