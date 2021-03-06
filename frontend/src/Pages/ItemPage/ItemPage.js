import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loaders/Loader/Loader';
import noPhoto from '../../assets/no_photo/no_photo.png';
import ButtonAddToCart from '../../Components/Buttons/ButtonAddToCart/ButtonAddToCart';
import ItemTable from './ItemTable/ItemTable';
import CounterAmount from './CounterAmount/CounterAmount';
import AvalibleSizes from './AvalibleSizes/AvalibleSizes';
import { addItemToCart} from '../../store/cart/actions';
import { fetchingItemData, resetStoreItem } from '../../store/item/actions';
import ErrorLoading from '../../Components/ErrorLoading/ErrorLoading';
import './ItemPage.css';

function ItemPage(props) {
    const { match } = props;
    const { loading, error, avaliable, itemData } = useSelector( store => store.loadingItem );
    const dispatch = useDispatch();
    const history = useHistory()
    const [ userSelect,  setUserSelect ] = useState({count: 1, size: null, id: null, price: null, title: null});
    const abortingController = new AbortController()

    useEffect(() => {
        fetchData();
        return () => {
            abortingController.abort()
            dispatch(resetStoreItem());
        }
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (itemData) {
            const { id, price, title } = itemData;
            setUserSelect(prevState => ({...prevState, id, price, title}))
        }
        // eslint-disable-next-line
    }, [itemData]);

    const fetchData = () => {
        dispatch( fetchingItemData(match.params.id, abortingController) );
    }

    const handleSelectSize = (size) => {
        setUserSelect( prevState => ({...prevState, size}))
    }

    const handleAmount = (count) => {
        setUserSelect( prevState => ({...prevState, count}))
    }

    const handleAddToCart = () => {
        dispatch(addItemToCart(userSelect))
        history.push('/cart');
    }
 
    return (
        <>
            {loading && <Loader />}
            {error && <ErrorLoading error={error} handlerRepeatRequest={fetchData} /> }
            {itemData && <section className="catalog-item">
                <h2 className="text-center">{itemData.title}</h2>
                <div className="row">
                    <div className="col-5">
                        <img src={itemData.images[0]} onError={(e)=>{e.target.onerror = null; e.target.src=noPhoto}}
                            className="img-fluid" alt=""/>
                    </div>
                    <div className="col-7">
                        <ItemTable item={itemData}/>
                        <div className="text-center">
                            <AvalibleSizes selectedSize={userSelect.size} handleSelectSize={handleSelectSize} list={itemData.sizes}/>
                            {avaliable && <CounterAmount initCount={userSelect.count} handleChangeCount={handleAmount}/>}
                        </div>
                       {avaliable && userSelect.size && <ButtonAddToCart handleClick={handleAddToCart}/>}
                    </div>
                </div>
            </section>}
        </>
    )
}

ItemPage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default ItemPage;

