import React from 'react';
import Copyright from './Copyright/Copyright';
import './Footer.css';
import FooterContacts from './FooterContacts/FooterContacts';
import FooterInfo from './FooterInfo/FooterInfo';
import Payments from './Payments/Payments';

function Footer() {
    return (
        <footer className="container bg-light footer">
            <div className="row">
                <div className="col">
                    <FooterInfo />
                </div>
                <div className="col">
                    <Payments/>
                    <Copyright />
                </div>
                <div className="col text-right">
                    <FooterContacts />
                </div>
            </div>
        </footer>
    )
}

export default Footer;

