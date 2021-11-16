import React from 'react';
import TopSales from '../../Components/TopSales/TopSales';

function Page404(props) {
    return (
        <TopSales title={'Страница не найдена'}>
            <p>Извините, такая страница не найдена!</p>
        </TopSales>
    )
}

export default Page404;

