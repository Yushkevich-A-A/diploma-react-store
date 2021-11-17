import React, { useEffect, useState } from 'react';
import CatalogBlock from '../../Components/CatalogBlock/CatalogBlock';
import ItemList from '../../Components/ItemList/ItemList';
import Loader from '../../Components/Loader/Loader';
import TopSales from '../../Components/TopSales/TopSales';

function MainPage(props) {
    const [ topData, setTopData] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/top-sales`)
            .then( resp => resp.json()) 
            .then( data => setTopData(prevState => [...prevState, ...data]))
    }, [])

    return (
        <>
            <TopSales title={'Хиты продаж!'}>
                {topData.length === 0 && <Loader />}
                {topData.length !== 0 && <ItemList list={topData} />}
            </TopSales>
            <CatalogBlock title={'Каталог'} search={false}/>
        </>
    )
}

export default MainPage;

