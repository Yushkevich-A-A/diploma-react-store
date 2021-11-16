import React from 'react'
import ContentContacts from './ContentContacts/ContentContacts'
import TopSales from '../../Components/TopSales/TopSales'

function Contacts(props) {
    return (
        <TopSales>
            <ContentContacts />
        </TopSales>
    )
}

Contacts.propTypes = {

}

export default Contacts

