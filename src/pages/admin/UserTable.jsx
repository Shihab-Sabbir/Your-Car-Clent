import React from 'react'
import { confirmAlert } from 'react-confirm-alert';
import toast from 'react-hot-toast';

function UserTable({ data, updateState, setUpdateState }) {
    const handleDelete = (id) => {
        confirmAlert({
            message: 'Are you sure to remove this product ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch(` https://assignment-11-five.vercel.app/product/${id}`, {
                            method: 'DELETE'
                        }).then(res => res.json()).then(data => {
                            if (data.deletedCount > 0) { toast.success('product deleted'); setUpdateState(!updateState); }
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
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            {(data?.length > 0) ?
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 text-[#00ACBD]  px-6 text-center">
                                Delete
                            </th>
                            <th scope="col" className="py-3 text-[#00ACBD] px-6 text-center">
                                Profile Name
                            </th>
                            <th scope="col" className="py-3 text-[#00ACBD] px-6 text-center">
                                Profile Image
                            </th>
                            <th scope="col" className="py-3 text-[#00ACBD] px-6 text-center">
                                Email
                            </th>
                            <th scope="col" className="py-3 text-[#00ACBD] px-6 text-center">
                                Verify
                            </th>
                            <th scope="col" className="py-3 text-[#00ACBD] px-6 text-center">
                                Advertise
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(user =>
                                <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center p-1">
                                    <td className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline" onClick={() => {
                                        handleDelete(user._id)
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

                                    <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                        <p className='flex gap-2 justify-center items-center'>
                                            {user?.role === 'seller' ? (user?.verify ? 'Seller Verified' : <button>Verify Seller Now</button>) : 'N/A'}
                                        </p>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className='flex justify-center items-center'>
                                            <select className='w-[70px] text-xs font-bold text-center m-0 p-1' name="status">
                                                <option className='text-xs text-center' value="not-sold" defaultChecked>UNSOLD</option>
                                                <option className='text-xs text-center' value="sold">SOLD</option>
                                            </select>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table> : <p className='text-center uppercase font-bold py-[18%]'>No product found !</p>}
        </div>
    )
}

export default UserTable;