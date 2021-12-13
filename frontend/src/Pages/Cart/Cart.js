import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import FormOrder from './FormOrder/FormOrder';
import CartList from './CartList/CartList';
import Loader from '../../Components/Loaders/Loader/Loader';
import { fetchDataToServer, removeItemFromCart, resetData } from '../../store/cart/actions';
import CartTable from './CartTable/CartTable';
import MessageSuccess from '../../Components/MessageSuccess/MessageSuccess';
import './Cart.css';

function Cart() {
    const { items, loading, error, successSending } = useSelector( state => state.manageCart );
    const dispatch = useDispatch();
    const history = useHistory()
    const [ success, setSuccess ] = useState(false);

    const handleDeleteOrder = (id) => {
        dispatch(removeItemFromCart(id))
    }

    useEffect(() => {
        if (successSending) {
            setSuccess(true);
            dispatch(resetData());
            setTimeout(() => {
                history.push('/')
            }, 5000)
        }
        // eslint-disable-next-line
    }, [successSending])

    
    const sendData = (formData) => {
        dispatch(fetchDataToServer(formData));
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
            { items.length !== 0 && <FormOrder sendData={sendData} error={error}/>}
        </>
    )
}

export default Cart;

