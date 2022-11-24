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
function MyProduct() {
    const [products, setProducts] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const { user, loading, updateState, setUpdateState, auth, setUser } = useContext(AuthContext);
    const navigate = useNavigate()
    useEffect(() => {
        axios.get(`http://localhost:5000/my-products/${user?.uid}`).then(res => { setProducts(res.data); setDataLoading(false) }).catch(err => {
            console.log(err);
            setDataLoading(false);
        })
        console.log(products)
    }, [updateState, loading, user])
    if (dataLoading) {
        return (
            <div className=" rounded relative mt-[100px]">
                <div className="rounded-full bg-[#b8ebf0] w-[190px] h-[190px] relative flex justify-center items-center mx-auto animate-spin">
                    <svg className="absolute top-[2px] right-0" width={76} height={97} viewBox="0 0 76 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_2495_2146" fill="white">
                            <path d="M76 97C76 75.6829 69.2552 54.9123 56.7313 37.6621C44.2074 20.4118 26.5466 7.56643 6.27743 0.964994L0.0860505 19.9752C16.343 25.2698 30.5078 35.5725 40.5526 49.408C50.5974 63.2436 56.007 79.9026 56.007 97H76Z" />
                        </mask>
                        <path d="M76 97C76 75.6829 69.2552 54.9123 56.7313 37.6621C44.2074 20.4118 26.5466 7.56643 6.27743 0.964994L0.0860505 19.9752C16.343 25.2698 30.5078 35.5725 40.5526 49.408C50.5974 63.2436 56.007 79.9026 56.007 97H76Z" stroke="#1ab7c5" strokeWidth={40} mask="url(#path-1-inside-1_2495_2146)" />
                    </svg>
                    <div className="rounded-full bg-white w-[150px] h-[150px]" />
                </div>
                <p className="absolute mx-auto inset-x-0 my-auto inset-y-[80px] text-base font-medium text-gray-800 text-center">
                    Loading ...
                </p>
            </div>
        )
    }

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

    const handleAddvertise = (info, id) => {
        setDataLoading(true)
        axios.post(`http://localhost:5000/advertise/${id}`, { info }).then(res => { toast.success(res.data); setUpdateState(!updateState); setDataLoading(false) }).catch(err => { console.log(err) })
}

    return (
        <div className='w-full lg:w-[1176px] p-2 mx-auto pt-10'>
            <Helmet>
                <title>Smile - product</title>
            </Helmet>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                {(products?.length > 0) ?
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="py-3 text-[#00ACBD]  px-6 text-center">
                                    Delete
                                </th>
                                <th scope="col" className="py-3 text-[#00ACBD] px-6 text-center">
                                    Product
                                </th>
                                <th scope="col" className="py-3 text-[#00ACBD] px-6 text-center">
                                    Category
                                </th>
                                <th scope="col" className="py-3 text-[#00ACBD] px-6 text-center">
                                    Price
                                </th>
                                <th scope="col" className="py-3 text-[#00ACBD] px-6 text-center">
                                    Status
                                </th>
                                <th scope="col" className="py-3 text-[#00ACBD] px-6 text-center">
                                    Advertise
                                </th>
                                <th scope="col" className="py-3 text-[#00ACBD] px-2 text-center">
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
                                                {product.sold == true ? 'SOLD':'AVAILABE'}
                                            </p>
                                        </td>
                                        <td className="py-4 px-6">
                                            <input type="checkbox" className='cursor-pointer' checked={product.add == true} name="" id="" onChange={() => handleAddvertise(product, product._id)} />
                                        </td>
                                        <td className="py-4 px-2">
                                            <label htmlFor="my-modal-2" className="text-sm cursor-pointer text-[#00ACBD]">Edit</label>
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