import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from '../../Components/Loader/Loader';
import noPhoto from '../../assets/no_photo/no_photo.png';
import ButtonAddToCart from '../../Components/ButtonAddToCart/ButtonAddToCart';
import ItemTable from './ItemTable/ItemTable';
import CounterAmount from './CounterAmount/CounterAmount';
import AvalibleSizes from './AvalibleSizes/AvalibleSizes';
import { addItemToCart } from '../../reduxFolder/actions/actions';
import './ItemPage.css';

function ItemPage(props) {
    const { match } = props;
    const [ itemData, setItemData ] = useState(null);
    const [ avaliable, setAvaliable ] = useState(true);
    const [ userSelect,  setUserSelect ] = useState({count: 1, size: null, id: null, price: null, title: null});
    const [ isRedirect, setRedirect ] = useState(false);
    const [ loading, setLoading ] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/items/${match.params.id}`)
            .then( resp => resp.json() )
            .then( data => {
                setLoading(false);
                if (data.sizes.filter( item => item.avalible).length === 0) {
                    setAvaliable(false);
                }
                const { id, price, title } = data;
                setUserSelect(prevState => ({...prevState, id, price, title}))
                setItemData(data);
            });
    }, []);

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
}

export default ItemPage

