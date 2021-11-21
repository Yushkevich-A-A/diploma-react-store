import React, { useEffect, useState } from 'react';
import FormOrder from './FormOrder/FormOrder';
import CartList from './CartList/CartList';
import { numberWithSpaces } from '../../functions/numberWithSpaces';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDataToServer, removeItemFromCart } from '../../reduxFolder/actions/actions';

function Cart(props) {
    const { items } = useSelector( state => state.manageCart );
    const dispatch = useDispatch()

    const abortingController = new AbortController();

    useEffect(() => {
        console.log(abortingController)
        return () => {
            abortingController.abort();
            console.log(abortingController);
            console.log('произошел аборсиге');
        };
    }, [])

    const handleDeleteOrder = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const sentData = (formData) => {
        dispatch(fetchDataToServer(formData, abortingController));
    }

    const getAmountSum = () => {
        return numberWithSpaces(items.reduce( (acc, sum) => sum.price * sum.count + acc, 0));
    }

    return (
        <>
        <section className="cart">
            <h2 className="text-center">Корзина</h2>
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
                    <CartList list={items} handleDeleteOrder={handleDeleteOrder} />
                    <tr>
                        <td colSpan="5" className="text-right">Общая стоимость</td>
                        <td>{getAmountSum()} руб.</td>
                    </tr>
                </tbody>
            </table>
        </section>
        { items.length !== 0 && <FormOrder sentData={sentData}/>}
        </>
    )
}

export default Cart;

