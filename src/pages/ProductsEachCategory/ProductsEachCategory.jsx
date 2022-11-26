import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import { differenceInYears, format } from 'date-fns';
import React from 'react'
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { TiTick } from 'react-icons/ti'
import { AiFillHeart } from 'react-icons/ai'
import { useEffect } from 'react';
import BookingModal from '../../component/BookingModal/BookingModal';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';

function ProductsEachCategory() {
    const location = useLocation();
    // const category = location.state?.data;
    const id = useParams();
    const [sellers, setsellers] = useState(null);
    const { user, dbUser } = useContext(AuthContext);
    const [wishList, setWishList] = useState(['random']);
    const [loading, setLoading] = useState(true);
    const [reload, setReload] = useState(true);
    const [showModal, setShowModal] = useState(false)

    const { isLoading, error, data } = useQuery({
        queryKey: ['category', user, id],
        queryFn: () =>
            fetch(`http://localhost:5000/product/${id.id}`).then(res =>
                res.json()
            )
    })

    useEffect(() => {
        axios.get(`http://localhost:5000/users?role=seller`).then(data => { setsellers(data.data); setLoading(false) }).catch(err => { console.log(err); setLoading(false) })
        axios.get(`http://localhost:5000/wishlist/${user?.uid}`).then(data => { setWishList(data.data); setLoading(false) }).catch(err => { console.log(err); setLoading(false) })
    }, [user, reload])

    const handleWishlist = (item, carId, uid) => {
        if (dbUser.role !== 'buyer') { toast.error('Only buyer can add wish items') }
        else {
            setLoading(true)
            axios.post(`http://localhost:5000/wishlist`, { item, carId, uid }).then(data => { toast.success(data.data); setReload(!reload); setLoading(false) }).catch(err => { console.log(err); setLoading(false) })
        }
    }
    const handleOrder = () => {
        if (dbUser.role !== 'buyer') { toast.error('Only buyer can book product') }
        else {
            setShowModal(true)
        }
    }
    console.log(wishList)
    if (isLoading || loading) return <DataLoadingSpinner />

    if (error) return 'An error has occurred: ' + error.message;
    return (
        <div>
            <div className='flex justify-center items-center'>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {
                        data?.map(item =>
                            <div key={item._id} className='w-[320px]'>
                                <div className='border relative'>
                                    <img src={item.image} className='w-[300px] h-[250px]' alt="" />
                                    <button className='absolute top-2 text-2xl right-2' onClick={() => handleWishlist(item, item._id, user?.uid)}>  <AiFillHeart className={wishList?.find(data => data.carId == item._id) ? 'text-2xl text-red-600' :'text-2xl text-amber-400'} /></button>
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
                                            <p className=''>
                                                 {
                                                    differenceInYears(
                                                        new Date(),
                                                        new Date(item?.year),
                                                    )
                                                } years used</p>
                                        </div>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex items-center gap-1'>
                                                <p className='capitalize my-2'>
                                                    Seller : {item?.sellerName}
                                                </p>
                                                <div>
                                                    {sellers?.map(seller => {
                                                        if ((seller.uid === item?.uid) && seller?.verify == true) {
                                                            return <div className='bg-sky-400 rounded-full'>
                                                                <span className='text-white'><TiTick /></span>
                                                            </div>
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                            <div>
                                                <p className='capitalize my-2'>
                                                    {item?.condition} condition
                                                </p>
                                            </div>
                                        </div>
                                        <div className='flex justify-between'>
                                            <label
                                                htmlFor="booking-modal"
                                                className='my-2 btn btn-sm bg-amber-400 border-0 text-slate-100 shadow-md dark:hover:border-white dark:hover:border' onClick={handleOrder}>Book now</label>
                                            {showModal && <BookingModal item={item} setShowModal={setShowModal} />}
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

export default ProductsEachCategory;