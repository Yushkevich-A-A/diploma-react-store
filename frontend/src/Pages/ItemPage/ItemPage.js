import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState  } from 'react';
import Loader from '../../Components/Loader/Loader';
import './ItemPage.css';
import ButtonAddToCart from '../../Components/ButtonAddToCart/ButtonAddToCart';
import ItemTable from './ItemTable/ItemTable';
import CounterAmount from './CounterAmount/CounterAmount';
import AvalibleSizes from './AvalibleSizes/AvalibleSizes';

function ItemPage(props) {

    const { match } = props;
    const [ itemData, setItemData ] = useState(null);
    const [ avaliable, setAvaliable ] = useState(true);
    const [ userSelect,  setUserSelect ] = useState({count: 1, size: null});

    useEffect( () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/items/${match.params.id}`)
            .then( resp => resp.json() )
            .then( data => {
                if (data.sizes.filter( item => item.avalible).length === 0) {
                    setAvaliable(false);
                }
                setItemData(data);
            });
    }, []);

    const handleSelectSize = (size) => {
        setUserSelect( prevState => ({...prevState, size}))
    }

    const handleAmount = (count) => {
        setUserSelect( prevState => ({...prevState, count}))
    }
 
    return (
        <>
            {!itemData && <Loader />}
            {itemData && <section className="catalog-item">
                {console.log(itemData)}
                <h2 className="text-center">{itemData.title}</h2>
                <div className="row">
                    <div className="col-5">
                        <img src={itemData.images[0]}
                            className="img-fluid" alt=""/>
                    </div>
                    <div className="col-7">
                        <ItemTable item={itemData}/>
                        <div className="text-center">
                            <AvalibleSizes selectedSize={userSelect.size} handleSelectSize={handleSelectSize} list={itemData.sizes}/>
                            {avaliable && <CounterAmount initCount={userSelect.count} handleChangeCount={handleAmount}/>}
                        </div>
                       {avaliable && userSelect.size && <ButtonAddToCart handleClick={() => console.log('добавляем товар в корзину')}/>}
                    </div>
                </div>
            </section>}
        </>
    )
}

ItemPage.propTypes = {

}

export default ItemPage

