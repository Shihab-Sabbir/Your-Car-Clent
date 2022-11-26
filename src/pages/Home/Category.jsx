import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'

function Category() {
    const { isLoading, error, data } = useQuery({
        queryKey: ['category'],
        queryFn: () =>
            fetch('https://your-car-server.vercel.app/category').then(res =>
                res.json()
            )
    })
    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message;

    return (
        <div className='my-20'>
            <p className='text-center text-3xl font-bold mb-20  text-black  dark:text-slate-200'>Category</p>
            <div className='flex justify-center items-center'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {
                        data?.map(item =>
                            <Link to={`/category/${item.categoryId}`} state={{ data: item?.categoryId }} key={item._id} className='w-[320px]'>
                                <p className='text-center text-2xl font-bold uppercase my-8 text-amber-300 '>{item.category}</p>
                                <img src={item.image} className='w-[300px] h-[250px]' alt="" />
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Category;