import React, { useState } from 'react'
import PropTypes from 'prop-types'

function FormOrder(props) {
    const { sentData } = props;

    const [ form, setForm ] = useState({phone: '', address: '', agreement: false})

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.type === 'checkbox' ? e.target.checked :e.target.value;
        setForm( prevState => ({...prevState, [name]: value}));
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        sentData({...form})
    }



    return (
        <section className="order">
            <h2 className="text-center">Оформить заказ</h2>
            <div className="card" style={{"maxWidth": "30rem", "margin": "0 auto"}}>
                <form className="card-body" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="phone">Телефон</label>
                        <input type="tel" 
                                className="form-control" 
                                name='phone'
                                id="phone" 
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Ваш телефон" 
                                required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Адрес доставки</label>
                        <input className="form-control" 
                                name='address'
                                id="address" 
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Адрес доставки" 
                                required/>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" 
                                className="form-check-input" 
                                name='agreement'
                                id="agreement" 
                                checked={form.agreement} 
                                onChange={handleChange} 
                                required/>
                        <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
                    </div>
                    <button type="submit" className="btn btn-outline-secondary">Оформить</button>
                </form>

            </div>
        </section>
    )
}

FormOrder.propTypes = {
    sentData: PropTypes.func.isRequired,
}

export default FormOrder

