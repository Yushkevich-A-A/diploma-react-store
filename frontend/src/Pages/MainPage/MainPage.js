import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ItemList from '../../Components/ItemList/ItemList';
import Loader from '../../Components/Loader/Loader';
import TopSales from '../../Components/TopSales/TopSales';
import { fetchTopSales, resetStoreTopSales } from '../../reduxFolder/actions/actionsTopSales/actionsTopSales';
import Catalog from '../Catalog/Catalog';

function MainPage() {
    const { loading, error } = useSelector( state => state.topSales )
    const dispatch = useDispatch()
    const [ topData, setTopData] = useState(null);
    const abortingController = new AbortController();

    useEffect(() => {
        dispatch(fetchTopSales((data) => {
            setTopData(data);
        }, abortingController));
        return () => {
            abortingController.abort();
            dispatch(resetStoreTopSales());
        }
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <TopSales title={'Хиты продаж!'}>
                { loading && <Loader /> }
                { error && <p>{error}</p> }
                { topData && <ItemList list={topData} />}
            </TopSales>
            <Catalog searching={false}/>
        </>
    )
}

export default MainPage;

