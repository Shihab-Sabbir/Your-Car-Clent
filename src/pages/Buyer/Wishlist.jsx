import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { differenceInYears } from 'date-fns';
import React from 'react'
import { useState } from 'react';
import { TiTick } from 'react-icons/ti'
import { ImCross } from 'react-icons/im'
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';

function Wishlist() {
    const { user, updateState } = useContext(AuthContext);
    const [sellers, setsellers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(true);
    const [showModal, setShowModal] = useState(false)

    const { isLoading, error, data } = useQuery({
        queryKey: ['category', user, reload, updateState],
        queryFn: () =>
            fetch(`https://your-car-server.vercel.app/wishlist/${user?.uid}`).then(res =>
                res.json()
            )
    })

    useEffect(() => {
        axios.get(`https://your-car-server.vercel.app/users?role=seller`).then(data => { setsellers(data.data); setLoading(false) })
    }, [])

    const handleWishlist = (id) => {
        setLoading(true)
        axios.delete(`https://your-car-server.vercel.app/wishlist/${id}`).then(data => { toast.success(data.data); setReload(!reload); setLoading(false) }).catch(err => { console.log(err); setLoading(false) })
    }

    if (isLoading) return <DataLoadingSpinner />

    if (error) return 'An error has occurred: ' + error.message;

    if (data.length === 0) {
        return <div className='flex justify-center items-center'>
            <Helmet>
                <title>Your Car - Wishlist</title>
            </Helmet>
            <p className='text-2xl text-center font-bold capitalize'>No Item is in WishList</p>
        </div>
    }


    return (
        <div className='mt-6 md:mt-8 lg:mt-10'>
            <div className='flex justify-center items-center'>
                <Helmet>
                    <title>Your Car - Wishlist</title>
                </Helmet>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {
                        data?.map(item =>
                            <div key={item.item._id} className='w-[320px]'>
                                <div className='border relative'>
                                    <img src={item.item.image} className='w-[300px] h-[250px]' alt="" />
                                    <button className='absolute top-2 text-2xl text-red-600 right-2' onClick={() => handleWishlist(item._id)}><ImCross /></button>
                                    <div className='p-2 bg-slate-200 dark:bg-slate-800'>
                                        <div className='flex items-center justify-between'>
                                            <p className='font-bold uppercase text-black dark:text-slate-200'>{item.item.name}</p>
                                            <p className='font-semibold text-xs border px-2 bg-amber-200 py-[2px] uppercase text-black'>{item.item?.date}</p>
                                        </div>
                                        <div className='flex items-center gap-2 my-2'>
                                            <p className='font-bold'><span className='text-xl'>$</span>{item.item?.resalePrice}</p>
                                            <p className='text-xs pt-[6px]'>Original price : ${item.item?.marketPrice}</p>
                                        </div>
                                        <div className='flex justify-between mt-2'>
                                            <p className='capitalize'>Location : {item.item?.location}</p>
                                            <p className='capitalize'>
                                                use : {
                                                    differenceInYears(
                                                        new Date(),
                                                        new Date(item.item?.year),
                                                    )
                                                } years</p>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <p className='capitalize my-2'>
                                                Seller : {item.item?.sellerName}
                                            </p>
                                            <div>
                                                {sellers?.map(seller => {
                                                    if ((seller.uid === item.item?.uid) && seller?.verify == true) {
                                                        return <div className='bg-sky-400 rounded-full'>
                                                            <span className='text-white'><TiTick /></span>
                                                        </div>
                                                    }
                                                })}
                                            </div>
                                        </div>
                                        <div className='flex justify-between'>
                                            <Link to='/dashboard/payment' state={{ price: item.item.resalePrice, id: item.carId }}
                                                className='my-2 btn btn-sm bg-amber-400 border-0 text-slate-100 shadow-md dark:hover:border-white dark:hover:border'>Buy now</Link>
                                            <Link to={`/product-details/${item.carId}`} >Details</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Wishlist;