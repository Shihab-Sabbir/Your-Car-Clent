import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link, useLocation} from 'react-router-dom';

function ProductsEachCategory() {
    const location = useLocation();
    const category = location.state?.data;

    const { isLoading, error, data } = useQuery({
        queryKey: ['category'],
        queryFn: () =>
            fetch(`http://localhost:5000/product/${category}`).then(res =>
                res.json()
            )
    })
    
    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message;

    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        data?.map(item =>
                            <Link to="/product" state={{ data: item?.category }} key={item._id} className='w-[320px]'>
                                <p className='text-center text-2xl font-bold uppercase text-black dark:text-slate-200'>{item.category}</p>
                                <img src={item.image} className='w-[300px] h-[250px]' alt="" />
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductsEachCategory;