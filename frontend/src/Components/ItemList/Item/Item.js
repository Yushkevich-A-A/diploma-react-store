import React, { useState } from 'react';
import { numberWithSpaces } from '../../../libs/numberWithSpaces';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '../../Buttons/Button/Button';
import noPhoto from '../../../assets/no_photo/no_photo.png';
import './Item.css';

function Item(props) {
    const { item } = props;
    const history = useHistory();

    const handleClick = () => {
        history.push(`/catalog/${item.id}`)
    }

    return (
        <div className="col-4">
            <div className="card catalog-item-card">
                <div className="block-image-wrapper">
                    <div className="block-image">
                        <img src={item.images[0]} onError={(e)=>{e.target.onerror = null; e.target.src=noPhoto}}
                        className="card-img-top img-fluid" alt={item.title}/>
                    </div>
                </div>

                <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{numberWithSpaces(item.price)} руб.</p>

                    <Button handleClick={handleClick} name={'Заказать'} />
                </div>
            </div>
        </div>
    )
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
};

export default Item;

