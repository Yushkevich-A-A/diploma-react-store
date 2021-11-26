import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../Components/Loaders/Loader/Loader';
import noPhoto from '../../assets/no_photo/no_photo.png';
import ButtonAddToCart from '../../Components/Buttons/ButtonAddToCart/ButtonAddToCart';
import ItemTable from './ItemTable/ItemTable';
import CounterAmount from './CounterAmount/CounterAmount';
import AvalibleSizes from './AvalibleSizes/AvalibleSizes';
import { addItemToCart} from '../../reduxFolder/actions/actionsCart/actionsCart';
import { fetchingItemData, resetStoreItem } from '../../reduxFolder/actions/actionsItem/actionsItem';
import './ItemPage.css';
import ErrorLoading from '../../Components/ErrorLoading/ErrorLoading';

function ItemPage(props) {
    const { match } = props;
    const { loading, error, avaliable } = useSelector( store => store.loadingItem )
    const dispatch = useDispatch();
    const [ itemData, setItemData ] = useState(null);
    const [ userSelect,  setUserSelect ] = useState({count: 1, size: null, id: null, price: null, title: null});
    const [ isRedirect, setRedirect ] = useState(false);
    const abortingController = new AbortController();

    useEffect(() => {
        fetchData()
        return () => {
            abortingController.abort();
            dispatch(resetStoreItem());
        }
        // eslint-disable-next-line
    }, []);

    const fetchData = () => {
        dispatch( fetchingItemData(match.params.id, (data) => {
            const { id, price, title } = data;
            setUserSelect(prevState => ({...prevState, id, price, title}))
            setItemData(data);
        }, abortingController) )
    }

    const handleSelectSize = (size) => {
        setUserSelect( prevState => ({...prevState, size}))
    }

    const handleAmount = (count) => {
        setUserSelect( prevState => ({...prevState, count}))
    }

    const handleAddToCart = () => {
        dispatch(addItemToCart(userSelect))
        setRedirect(true);
    }
 
    return (
        <>
            {loading && <Loader />}
            { error && <ErrorLoading error={error} handlerRepeatRequest={fetchData} /> }
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
                {isRedirect && <Redirect to='/cart'/>}
            </section>}
        </>
    )
}

ItemPage.propTypes = {
    match: PropTypes.object.isRequired,
};

export default ItemPage;

