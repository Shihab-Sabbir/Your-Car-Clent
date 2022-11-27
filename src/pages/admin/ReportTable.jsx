import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';
import { AuthContext } from '../../UserContext/UserContext';
import { logOut } from '../../Utility/logout';

function UserTable({ data, updateState, setUpdateState }) {
    const [dataLoading, setDataLoading] = useState(false);
    const { user, setUser, setDbUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleDelete = (id) => {
        confirmAlert({
            message: 'Are you sure to remove this user ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setDataLoading(true)
                        fetch(`http://localhost:5000/delete-product/${id}`, {
                            method: 'DELETE',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('your-car-token')}`
                            }
                        }).then(res => {
                            if (res.status == 403) {
                                return logOut(user, setUser, navigate, setDbUser);
                            }
                            else { return res.json() }
                        }).then(data => {
                            if (data.deletedCount > 0 || data.matchedCount > 0) {
                                toast.success('Product removed !');
                            }
                            setUpdateState(!updateState);
                            setDataLoading(false);
                        }).catch(err => { console.log(err); setDataLoading(false) })
                    }
                },
                {
                    label: 'No',
                    onClick: () => { setDataLoading(false) }
                }
            ]
        });
    }
    const handleDeteleReport = (id) => {
        setDataLoading(true)
        axios.patch(`https://your-car-server.vercel.app/remove-report/${id}`, {}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('your-car-token')}`
            }
        }).then(data => { toast.success('Report is removed'); setUpdateState(!updateState); setDataLoading(false) }).catch(err => {
            console.log(err);
            setDataLoading(false);
            if (err.response.status == 403) {
                logOut(user, setUser, navigate);
            }
        })
    }

    if (dataLoading) {
        return <DataLoadingSpinner />
    }
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-1 lg:p-2 xl:p-4">
            <Helmet>
                <title>Your Car - Reported Products</title>
            </Helmet>
            {(data?.length > 0) ?
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 text-amber-400  px-6 text-center">
                                Delete
                            </th>
                            <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                Product Name
                            </th>
                            <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                Product Image
                            </th>
                            <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                Seller Name
                            </th>
                            <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(product =>
                                <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center p-1">
                                    <td className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline" onClick={() => {
                                        handleDelete(product._id)
                                    }}>
                                        Remove Product
                                    </td>
                                    <td className="p-4 max-w-[150px] font-semibold text-center">
                                        {product.name}
                                    </td>
                                    <td className="p-4 max-w-[150px] text-xs font-semibold text-center">
                                        <img className='w-[100px] h-[90px] mt-1 rounded-lg mx-auto' src={product.image} alt="" />
                                    </td>
                                    <td className="py-4 px-6 font-thin text-justify  max-w-fit text-gray-900 dark:text-white">
                                        <p className='font-semibold text-center'>{product.sellerName}</p>
                                    </td>
                                    <td className="py-4 px-6 font-thin text-justify  max-w-fit text-gray-900 dark:text-white">
                                        <div className='flex justify-center'>
                                            <button className='btn btn-xs bg-amber-300 text-center border-0 text-black hover:text-white' onClick={() => handleDeteleReport(product._id)}>Cancel Report</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table> : <p className='text-center uppercase font-bold py-[18%]'>No report found !</p>}
        </div>
    )
}

export default UserTable;