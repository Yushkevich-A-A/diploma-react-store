import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function CounterAmount(props) {
    const { initCount, handleChangeCount } = props;

    const [ count, setCount ] = useState(initCount);

    useEffect( () => {
        handleChangeCount(count);
    }, [count]);

    const inkCount = () => {
        if (count >= 10) {
            return;
        }
        setCount(count + 1);
    }

    const decCount = () => {
        if (count <= 1) {
            return;
        }
        setCount(count - 1);
    }




    return (
        <p>Количество: <span className="btn-group btn-group-sm pl-2">
            <button className="btn btn-secondary" onClick={decCount}>-</button>
            <span className="btn btn-outline-primary">{count}</span>
            <button className="btn btn-secondary" onClick={inkCount}>+</button>
        </span>
</p>
    )
}

CounterAmount.propTypes = {
    initCount: PropTypes.number.isRequired,
    handleChangeCount: PropTypes.func.isRequired,
}

export default CounterAmount

