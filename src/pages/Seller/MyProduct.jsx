import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import { AiFillStar } from 'react-icons/ai'
// import Editproduct from '../Editproduct/Editproduct';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import toast from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import axios from 'axios';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';
function MyProduct() {
    const [products, setProducts] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const { user, loading, updateState, setUpdateState, auth, setUser } = useContext(AuthContext);

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`https://your-car-server.vercel.app/my-products/${user?.uid}`).then(res => { setProducts(res.data); setDataLoading(false) }).catch(err => {
            console.log(err);
            setDataLoading(false);
        })
    }, [updateState, loading, user])

    if (dataLoading) {
        return <DataLoadingSpinner />
    }

    const handleDelete = (id) => {
        confirmAlert({
            message: 'Are you sure to remove this product ?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        setDataLoading(true)
                        fetch(`https://your-car-server.vercel.app/delete-product/${id}`, {
                            method: 'DELETE',
                            headers: {
                                authorization: `Bearer ${localStorage.getItem('your-car-token')}`
                            }
                        }).then(res => res.json()).then(data => {
                            if (data.deletedCount > 0) { toast.success('product deleted'); setUpdateState(!updateState); setDataLoading(false) }
                            console.log(data)
                        }).catch(err => { console.log(err); setDataLoading(false) });
                    }
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]
        });
    }

    const handleAddvertise = (info, id) => {
        setDataLoading(true)
        axios.post(`https://your-car-server.vercel.app/advertise/${id}`, {}, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('your-car-token')}`
            }
        }, { info }).then(res => { toast.success(res.data); setUpdateState(!updateState); setDataLoading(false) }).catch(err => { console.log(err) })
    }

    return (
        <div className='w-full lg:w-[1176px] p-2 mx-auto pt-10'>
            <Helmet>
                <title>Smile - product</title>
            </Helmet>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                {(products?.length > 0) ?
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 text-amber-400  px-6 text-center">
                                    Delete
                                </th>
                                <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                    Product
                                </th>
                                <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                    Category
                                </th>
                                <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                    Price
                                </th>
                                <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                    Status
                                </th>
                                <th scope="col" className="py-3 text-amber-400 px-6 text-center">
                                    Advertise
                                </th>
                                <th scope="col" className="py-3 text-amber-400 px-2 text-center">
                                    Edit
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                products?.map(product =>
                                    <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center p-1">
                                        <td className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline" onClick={() => {
                                            handleDelete(product._id)
                                        }}>
                                            Remove
                                        </td>
                                        <td className="p-4 max-w-[150px] text-xs font-semibold text-center">
                                            {product.name}
                                            <img className='w-[100px] h-[70px] mt-1 rounded-lg mx-auto' src={product.image} alt="" />
                                        </td>
                                        <td className="py-4 px-6 font-thin text-justify  max-w-fit text-gray-900 dark:text-white">
                                            <p className='font-semibold text-center uppercase'>{product.category}</p>
                                        </td>

                                        <td className="py-4 px-6 font-semibold text-gray-900 dark:text-white">
                                            <p className='flex gap-2 justify-center items-center'>
                                                ${product.resalePrice}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <p className='text-xs font-bold m-0 p-1 text-center'>
                                                {product.sold == true ? 'SOLD' : 'AVAILABE'}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <input type="checkbox" className='cursor-pointer' checked={product.add == true} name="" id="" onChange={() => handleAddvertise(product, product._id)} />
                                        </td>
                                        <td className="py-4 px-2">
                                            <label htmlFor="my-modal-2" className="text-sm cursor-pointer text-amber-400">Edit</label>
                                            {/* <Editproduct tile={product.serviceName} producttitle={product.producttitle} comment={product.comment} rating={product.rating} id={product._id} /> */}
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table> : <p className='text-center uppercase font-bold py-[18%]'>No product found !</p>}
            </div>
        </div>
    )
}

export default MyProduct;