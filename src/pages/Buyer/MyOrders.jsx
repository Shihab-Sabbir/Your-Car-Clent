import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import axios from 'axios';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';
function MyOrders() {
    const [orders, setOrders] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const { user, loading, updateState, setUpdateState } = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`https://your-car-server.vercel.app/my-orders/${user?.uid}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('your-car-token')}`
            }
        }).then(res => { setOrders(res.data); setDataLoading(false) }).catch(err => {
            console.log(err);
            setDataLoading(false);
        })

    }, [updateState, loading, user])

    // console.log(orders)

    if (dataLoading) {
        return <DataLoadingSpinner />
    }

    const handleDelete = (id) => {
        confirmAlert({
            message: 'Are you sure to remove this order ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(` https://assignment-11-five.vercel.app/order/${id}`, {
                            method: 'DELETE'
                        }).then(res => res.json()).then(data => {
                            if (data.deletedCount > 0) { toast.success('order deleted'); setUpdateState(!updateState); }
                        });
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    return (
        <div className='w-full lg:w-[1176px] p-2 mx-auto pt-10'>
            <Helmet>
                <title>Smile - order</title>
            </Helmet>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                {(orders?.length > 0) ?
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 text-amber-500  px-6 text-center">
                                    Delete
                                </th>
                                <th scope="col" className="py-3 text-amber-500 px-6 text-center">
                                    Image
                                </th>
                                <th scope="col" className="py-3 text-amber-500 px-6 text-center">
                                    Name
                                </th>
                                <th scope="col" className="py-3 text-amber-500 px-6 text-center">
                                    Price
                                </th>
                                <th scope="col" className="py-3 text-amber-500 px-6 text-center">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                orders?.map(order =>
                                    <tr key={order._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center p-1">
                                        <td className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline" onClick={() => {
                                            handleDelete(order._id)
                                        }}>
                                            Remove
                                        </td>
                                        <td className="p-4 max-w-[150px] text-xs font-semibold text-center">
                                            <img className='w-[100px] h-[70px] mt-1 rounded-lg mx-auto' src={order.image} alt="" />
                                        </td>
                                        <td className="py-4 px-6 font-thin text-justify  max-w-fit text-gray-900 dark:text-white">
                                            <p className='font-semibold text-center'> {order.productName}</p>
                                        </td>
                                        <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                            <p className='flex gap-2 justify-center items-center'>
                                                ${order.price}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className='flex justify-center items-center'>
                                                {order.sold == true ? <Link className='btn btn-xs bg-amber-300 text-center' >PAID</Link>
                                                    :
                                                    <Link to='/dashboard/payment' state={{ price: order.price, id: order.carId }} className='btn btn-xs bg-amber-300 text-center' >PAY</Link>}
                                            </div>
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table> : <p className='text-center uppercase font-bold py-[18%]'>No order found !</p>}
            </div>
        </div>
    )
}

export default MyOrders;