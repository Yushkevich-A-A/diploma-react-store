import React from 'react'
import TopSales from '../../Components/TopSales/TopSales'
import ContentAbout from './/ContentAbout/ContentAbout'

function About(props) {
    return (
        <TopSales title={'О магазине'}>
            <ContentAbout />
        </TopSales>
    )
}

export default About

