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
    const { user, setUser } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const handleDelete = (id, uid) => {
        confirmAlert({
            message: 'Are you sure to remove this user ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setDataLoading(true)
                        fetch(`https://your-car-server.vercel.app/delete-user/${id}?uid=${uid}`, {
                            method: 'DELETE',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('your-car-token')}`
                            }
                        }).then(res => {
                            console.log(res)
                            if (res.status == 403) {
                                return logOut(user, setUser, navigate);
                            }
                            else { return res.json() }
                        }).then(data => {
                            if (data.modifiedCount > 0 || data.matchedCount > 0) {
                                toast.success('User removed !');
                                setUpdateState(!updateState);
                                setDataLoading(false);
                            }
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

    const handleVerify = uid => {
        setDataLoading(true)
        axios.post(`https://your-car-server.vercel.app/verify-seller/${uid}`, {}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('your-car-token')}`
            }
        }).then(res => {
            toast.success(res.data); setUpdateState(!updateState); setDataLoading(false)
        }).catch(err => {
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
                <title>Your Car - Admin Panel</title>
            </Helmet>
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
                                            {user?.verify ? <button onClick={() => handleVerify(user?.uid)} className='p-1 rounded-lg shadow-lg px-2 py-1 border border-sky-500 dark:shadow-sky-300 dark:shadow-md'>Verified</button> : <button onClick={() => handleVerify(user?.uid)} className='p-1 rounded-lg shadow-lg px-2 py-1 border border-amber-500 dark:shadow-amber-100 dark:shadow'>Verify Seller Now</button>}
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