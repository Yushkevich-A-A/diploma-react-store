import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import FormOrder from './FormOrder/FormOrder';
import CartList from './CartList/CartList';
import Loader from '../../Components/Loaders/Loader/Loader';
import { fetchDataToServer, removeItemFromCart, resetData } from '../../store/cart/actions';
import CartTable from './CartTable/CartTable';
import MessageSuccess from '../../Components/MessageSuccess/MessageSuccess';
import './Cart.css';

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
            dispatch(resetData());
            setTimeout(() => {
                dispatch(resetData());
                setRedirect(true);
            }, 5000)
        } , abortingController));
    }

    return (
        <>
            {
            <CSSTransition in={success} classNames='success-block' timeout={300} unmountOnExit>
               <MessageSuccess /> 
            </CSSTransition>
            }
            <section className="cart">
                <h2 className="text-center">Корзина</h2>
                <CartTable items={items}>
                    <CartList list={items} handleDeleteOrder={handleDeleteOrder} />
                </CartTable>
            </section>
            {loading && <Loader />}
            
            {error && console.log(error)}
            { items.length !== 0 && <FormOrder sentData={sentData} error={error}/>}
            {redirect && <Redirect to='/' />}
        </>
    )
}

export default Cart;

