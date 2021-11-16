import React from 'react';
import './Main.css';
import Banner from '../../Banner/Banner';

function Main(props) {
    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner />
                    {props.children}
                </div>
            </div>
        </main>
    )
}

export default Main

