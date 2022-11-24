import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { differenceInYears, format } from 'date-fns';
import React from 'react'
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TiTick } from 'react-icons/ti'

function ProductsEachCategory() {
    const location = useLocation();
    const category = location.state?.data;
    const [sellers, setsellers] = useState(null);
    const { isLoading, error, data } = useQuery({
        queryKey: ['category'],
        queryFn: () =>
            fetch(`http://localhost:5000/product/${category}`).then(res =>
                res.json()
            )
    })

    axios.get(`http://localhost:5000/users?role=seller`).then(data => setsellers(data.data))

    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message;
    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        data?.map(item =>
                            <Link to="/product" state={{ data: item?.category }} key={item._id} className='w-[320px]'>
                                <div className='border relative'>
                                    <img src={item.image} className='w-[300px] h-[250px]' alt="" />
                                    <button className='absolute top-2 right-2'>wish</button>
                                    <div className='p-2 bg-slate-200 dark:bg-slate-800'>
                                        <div className='flex items-center justify-between'>
                                            <p className='font-bold uppercase text-black dark:text-slate-200'>{item.name}</p>
                                            <p className='font-semibold text-xs border px-2 bg-amber-200 py-[2px] uppercase text-black'>{item?.date}</p>
                                        </div>
                                        <div className='flex items-center gap-2 my-2'>
                                            <p className='font-bold'><span className='text-xl'>$</span>{item?.resalePrice}</p>
                                            <p className='text-xs pt-[6px]'>Original price : ${item?.marketPrice}</p>
                                        </div>
                                        <div className='flex justify-between mt-2'>
                                            <p className='capitalize'>Location : {item?.location}</p>
                                            <p className='capitalize'>
                                                use : {
                                                    differenceInYears(
                                                        new Date(),
                                                        new Date(item?.year),
                                                    )
                                                } years</p>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <p className='capitalize my-2'>
                                                Seller : {item?.sellerName}
                                            </p>
                                            <div>
                                                {sellers?.map(seller => {
                                                    if (seller.uid === item?.uid) {
                                                        return <div className='bg-sky-400 rounded-full'>
                                                            <span className='text-white'><TiTick /></span>
                                                        </div>
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        <div className='flex justify-between'>
                                            <button className='my-2 btn btn-sm bg-amber-400 border-0 text-slate-100 shadow-md dark:hover:border-white dark:hover:border'>Book now</button>
                                            <button className='my-2'>Details</button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductsEachCategory;