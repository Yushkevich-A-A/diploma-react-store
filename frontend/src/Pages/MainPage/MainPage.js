import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopSales, resetStoreTopSales } from '../../store/topSales/actions';
import ErrorLoading from '../../Components/ErrorLoading/ErrorLoading';
import ItemList from '../../Components/ItemList/ItemList';
import Loader from '../../Components/Loaders/Loader/Loader';
import TopSales from '../../Components/TopSales/TopSales';
import Catalog from '../Catalog/Catalog';

function MainPage(props) {
    const { loading, error, topSalesData } = useSelector( state => state.topSales );
    const dispatch = useDispatch();
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
        dispatch(fetchTopSales(abortingController));
    }

    return (
        <>
            <TopSales title={'Хиты продаж!'}>
                { loading && <Loader /> }
                { error && <ErrorLoading error={error} handlerRepeatRequest={handleFetchRequest} /> }
                { topSalesData && <ItemList list={topSalesData} />}
            </TopSales>
            <Catalog searching={false}/>
        </>
    )
}

export default MainPage;

