import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopSales, resetStoreTopSales } from '../../reduxFolder/actions/actionsTopSales/actionsTopSales';
import ErrorLoading from '../../Components/ErrorLoading/ErrorLoading';
import ItemList from '../../Components/ItemList/ItemList';
import Loader from '../../Components/Loaders/Loader/Loader';
import TopSales from '../../Components/TopSales/TopSales';
import Catalog from '../Catalog/Catalog';

function MainPage() {
    const { loading, error } = useSelector( state => state.topSales );
    const dispatch = useDispatch();
    const [ topData, setTopData] = useState(null);
    const abortingController = new AbortController();

    useEffect(() => {
        handleFetchRequest();
        return () => {
            abortingController.abort();
            dispatch(resetStoreTopSales());
        }
        // eslint-disable-next-line
    }, []);

    const handleFetchRequest = () => {
        dispatch(fetchTopSales((data) => {
            setTopData(data);
        }, abortingController));
    }

    return (
        <>
            <TopSales title={'Хиты продаж!'}>
                { loading && <Loader /> }
                { error && <ErrorLoading error={error} handlerRepeatRequest={handleFetchRequest} /> }
                { topData && <ItemList list={topData} />}
            </TopSales>
            <Catalog searching={false}/>
        </>
    )
}

export default MainPage;

