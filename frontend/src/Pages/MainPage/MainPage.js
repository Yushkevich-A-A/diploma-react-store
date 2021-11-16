import React, { useEffect, useState } from 'react';
import CatalogBlock from '../../Components/CatalogBlock/CatalogBlock';
import ItemList from '../../Components/ItemList/ItemList';
import Loader from '../../Components/Loader/Loader';
import TopSales from '../../Components/TopSales/TopSales';

function MainPage(props) {

    const [ topData, setTopData] = useState([]);
    const [ catalog, setCatalog ] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/top-sales`)
            .then( resp => resp.json()) 
            .then( data => setTopData(prevState => [...prevState, ...data]))
        
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/categories`)
            .then( resp => resp.json()) 
            .then( data => setCatalog(prevState => [...prevState, ...data]))
    }, [])

    return (
        <>
            <TopSales title={'Хиты продаж!'}>
                {topData.length === 0 && <Loader />}
                {topData.length !== 0 && <ItemList list={topData} />}
            </TopSales>
            <CatalogBlock title={'Каталог'}>
                {catalog.length === 0 && <Loader />}
            </CatalogBlock>
        </>
    )
}

export default MainPage;

