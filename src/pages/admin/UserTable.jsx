import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';
import { useLocation } from 'react-router-dom';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';
import { handleDeleteUser } from '../../Utility/userDelete';

function UserTable({ data, updateState, setUpdateState }) {
    const [dataLoading, setDataLoading] = useState(false);
    const location = useLocation();

    const handleDelete = (id, uid) => {
        setDataLoading(true)
        handleDeleteUser(id, setUpdateState, setDataLoading, updateState, uid)
    }

    const handleVerify = uid => {
        setDataLoading(true)
        axios.post(`http://localhost:5000/verify-seller/${uid}`,{}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('your-car-token')}`
            }
        }).then(res => { toast.success(res.data); setUpdateState(!updateState); setDataLoading(false) }).catch(err => { console.log(err); setDataLoading(false) })
    }
    if (dataLoading) {
        return <DataLoadingSpinner />
    }
    return (
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg p-1 lg:p-2 xl:p-4">
            {(data?.length > 0) ?
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 text-amber-400  px-6 text-center">
                                Delete
                            </th>
                            <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                Profile Name
                            </th>
                            <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                Profile Image
                            </th>
                            <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                Email
                            </th>
                            {location.pathname.split('/')[2] === 'all-sellers' && <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                Verify
                            </th>}
                            {/* {location.pathname.split('/')[2] === 'all-sellers' && <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                Report
                            </th>} */}
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(user =>
                                <tr key={user.uid} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center p-1">
                                    <td className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline" onClick={() => {
                                        handleDelete(user._id, user?.uid)
                                    }}>
                                        Remove
                                    </td>
                                    <td className="p-4 max-w-[150px] font-semibold text-center">
                                        {user.displayName}
                                    </td>
                                    <td className="p-4 max-w-[150px] text-xs font-semibold text-center">
                                        <img className='w-[100px] h-[90px] mt-1 rounded-lg mx-auto' src={user.photoURL} alt="" />
                                    </td>
                                    <td className="py-4 px-6 font-thin text-justify  max-w-fit text-gray-900 dark:text-white">
                                        <p className='font-semibold text-center'>{user.email}</p>
                                    </td>

                                    {location.pathname.split('/')[2] === 'all-sellers' && <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        <p className='flex gap-2 justify-center items-center'>
                                            {user?.verify ? <button onClick={() => handleVerify(user?.uid)}>Verified</button> : <button onClick={() => handleVerify(user?.uid)}>Verify Seller Now</button>}
                                        </p>
                                    </td>}
                                    {/* {location.pathname.split('/')[2] === 'all-sellers' && <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        <p className='flex gap-2 justify-center items-center'>
                                            {user?.role === 'seller' ? (user?.verify ? <button onClick={() => handleVerify(user?.uid)}>Verified</button> : <button onClick={() => handleVerify(user?.uid)}>Verify Seller Now</button>) : 'N/A'}
                                        </p>
                                    </td>} */}
                                </tr>
                            )
                        }
                    </tbody>
                </table> : <p className='text-center uppercase font-bold py-[18%]'>No product found !</p>}
        </div>
    )
}

export default UserTable;