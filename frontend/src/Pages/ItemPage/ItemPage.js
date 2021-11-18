import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState  } from 'react';
import Loader from '../../Components/Loader/Loader';
import './ItemPage.css';
import noPhoto from '../../assets/no_photo/no_photo.png'
import ButtonAddToCart from '../../Components/ButtonAddToCart/ButtonAddToCart';
import ItemTable from './ItemTable/ItemTable';
import CounterAmount from './CounterAmount/CounterAmount';
import AvalibleSizes from './AvalibleSizes/AvalibleSizes';

function ItemPage(props) {
    const { match } = props;
    const [ itemData, setItemData ] = useState(null);
    const [ avaliable, setAvaliable ] = useState(true);
    const [ userSelect,  setUserSelect ] = useState({count: 1, size: null, id: null, price: null, title: null});
    const [ isRedirect, setRedirect ] = useState(false);

    console.log(itemData);

    useEffect( () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/items/${match.params.id}`)
            .then( resp => resp.json() )
            .then( data => {
                if (data.sizes.filter( item => item.avalible).length === 0) {
                    setAvaliable(false);
                }
                const id = data.id;
                const price = data.price;
                const title = data.title;
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
        const valueInLocalstorage = JSON.parse(localStorage.getItem('cart'));
        console.log(userSelect);
        const indexExistOrder = valueInLocalstorage.findIndex( item => item.id === userSelect.id && item.size === userSelect.size);
        if (indexExistOrder === -1) {
            valueInLocalstorage.push(userSelect);
        } else {
            valueInLocalstorage[indexExistOrder].count += userSelect.count;
        }
        localStorage.setItem('cart', JSON.stringify(valueInLocalstorage));
        setRedirect(true)
    }
 
    return (
        <>
            {!itemData && <Loader />}
            {itemData && <section className="catalog-item">
                {console.log(itemData)}
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

}

export default ItemPage

