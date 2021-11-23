import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import FormOrder from './FormOrder/FormOrder';
import CartList from './CartList/CartList';
import Loader from '../../Components/Loader/Loader'
import { fetchDataToServer, removeItemFromCart, resetData } from '../../reduxFolder/actions/actionsCart/actionsCart';
import CartTable from './CartTable/CartTable';


function Cart(props) {
    const { items, loading, error } = useSelector( state => state.manageCart );
    const dispatch = useDispatch();
    const [ redirect, setRedirect ] = useState(false);
    const [ success, setSuccess ] = useState(false);

    const abortingController = new AbortController();

    useEffect(() => {
        return () => { abortingController.abort() };
        // eslint-disable-next-line
    }, [])

    const handleDeleteOrder = (id) => {
        dispatch(removeItemFromCart(id))
    }

    const sentData = (formData) => {
        dispatch(fetchDataToServer(formData, () => {
            setSuccess(true);
            setTimeout(() => {
                dispatch(resetData());
                setRedirect(true);
            }, 5000)
        } , abortingController));
    }

    return (
        <>
            <section className="cart">
                <h2 className="text-center">Корзина</h2>
                <CartTable items={items}>
                    <CartList list={items} handleDeleteOrder={handleDeleteOrder} />
                </CartTable>
            </section>
            {loading && <Loader />}
            {success &&  console.log('показываем сообщение об успехе')}
            {error && console.log(error)}
            { items.length !== 0 && <FormOrder sentData={sentData}/>}
            {redirect && <Redirect to='/' />}
        </>
    )
}

export default Cart;

