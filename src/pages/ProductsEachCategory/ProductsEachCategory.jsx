import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';
import DisplayProducts from '../../component/DisplayProducts/DisplayProducts';

function ProductsEachCategory() {
    const id = useParams();
    const { user } = useContext(AuthContext);

    const { isLoading, error, data } = useQuery({
        queryKey: ['category', user, id],
        queryFn: () =>
            fetch(`https://your-car-server.vercel.app/product/${id.id}`).then(res =>
                res.json()
            )
    })

    if (isLoading) return <DataLoadingSpinner />

    if (error) return 'An error has occurred: ' + error.message;
    return (
        <DisplayProducts data={data} />
    )
}

export default ProductsEachCategory;