import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { differenceInYears } from 'date-fns';
import { TiTick } from 'react-icons/ti'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';
import Advertise from '../Home/Advertise';
import { PhotoView } from 'react-photo-view';
import BookingModal from '../../component/BookingModal/BookingModal';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import AOS from 'aos';

function ProductDetails() {
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [sellers, setsellers] = useState(null);
    const [reload, setReload] = useState(true);
    const { user, dbUser } = useContext(AuthContext);
    const [showModal, setShowModal] = useState(false)
    const params = useParams();
    const { category, name, details, resalePrice, model, image, date, sellerName, year, location, condition, uid } = product;
    useEffect(() => {
        axios.get(`https://your-car-server.vercel.app/single-product/${params.id}`).then(data => { setProduct(data.data); setLoading(false) }).catch(err => { console.log(err); setLoading(false) })
        axios.get(`https://your-car-server.vercel.app/users?role=seller`).then(data => { setsellers(data.data); setLoading(false) }).catch(err => { console.log(err); setLoading(false) })
        AOS.init();
        window.scrollTo(0, 0)
    }, [reload])
    const cartHandle = () => { }

    const handleOrder = () => {
        if (dbUser.role !== 'buyer') { toast.error('Only buyer can book product') }
        else {
            setShowModal(true)
        }
    }

    if (loading) return <DataLoadingSpinner />
    return (
        <div className='p-1 lg:p-4 mx-auto w-full mt-10 lg:mt-18'>
            <div className="flex justify-center items-center lg:flex-row-reverse flex-col gap-8">
                <div className="  w-full sm:w-96 md:w-8/12 lg:w-6/12 items-center">
                    <p className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-600 dark:text-gray-200">Home / {category} / {name}</p>
                    <h2 className="font-semibold lg:text-4xl text-3xl lg:leading-9 leading-7 text-gray-800 dark:text-gray-100 mt-4">{name}</h2>

                    <div className=" flex flex-row justify-between  mt-5 ">
                        <div className=" flex flex-row space-x-3 ">
                            <svg className=" cursor-pointer" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                                    fill="#fbbf24"
                                />
                            </svg>
                            <svg className=" cursor-pointer" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                                    fill="#fbbf24"
                                />
                            </svg>
                            <svg className=" cursor-pointer" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                                    fill="#fbbf24"
                                />
                            </svg>
                            <svg className=" cursor-pointer" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20Z"
                                    fill="#fbbf24"
                                />
                            </svg>
                            <svg className=" cursor-pointer" width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M15.5598 20C15.3998 20.0006 15.2421 19.9629 15.0998 19.89L9.99976 17.22L4.89976 19.89C4.73416 19.977 4.54744 20.0159 4.36084 20.0022C4.17424 19.9884 3.99524 19.9226 3.84419 19.8122C3.69314 19.7017 3.5761 19.5511 3.50638 19.3775C3.43665 19.2039 3.41704 19.0142 3.44976 18.83L4.44976 13.2L0.329763 9.19996C0.20122 9.07168 0.110034 8.91083 0.0659903 8.73465C0.0219465 8.55848 0.0267076 8.37363 0.0797626 8.19996C0.137723 8.02223 0.244339 7.86431 0.387513 7.74412C0.530687 7.62392 0.704685 7.54627 0.889763 7.51996L6.58976 6.68996L9.09976 1.55996C9.18165 1.39089 9.3095 1.2483 9.46867 1.14853C9.62785 1.04876 9.81191 0.99585 9.99976 0.99585C10.1876 0.99585 10.3717 1.04876 10.5309 1.14853C10.69 1.2483 10.8179 1.39089 10.8998 1.55996L13.4398 6.67996L19.1398 7.50996C19.3248 7.53627 19.4988 7.61392 19.642 7.73412C19.7852 7.85431 19.8918 8.01223 19.9498 8.18996C20.0028 8.36363 20.0076 8.54848 19.9635 8.72465C19.9195 8.90083 19.8283 9.06168 19.6998 9.18996L15.5798 13.19L16.5798 18.82C16.6155 19.0074 16.5968 19.2012 16.5259 19.3784C16.455 19.5556 16.3349 19.7088 16.1798 19.82C15.9987 19.9469 15.7806 20.0102 15.5598 20ZM9.99976 15.1C10.1601 15.0959 10.3186 15.1338 10.4598 15.21L14.2298 17.21L13.5098 13C13.4818 12.8392 13.4936 12.6741 13.5442 12.5189C13.5947 12.3638 13.6825 12.2234 13.7998 12.11L16.7998 9.17996L12.5998 8.55996C12.4457 8.52895 12.3012 8.46209 12.1778 8.3648C12.0545 8.2675 11.9558 8.14251 11.8898 7.99996L9.99976 4.24996L8.10976 7.99996C8.03741 8.14366 7.93145 8.26779 7.80089 8.3618C7.67032 8.45581 7.51899 8.51692 7.35976 8.53996L3.15976 9.15996L6.15976 12.09C6.27704 12.2034 6.36478 12.3438 6.41533 12.4989C6.46588 12.6541 6.4777 12.8192 6.44976 12.98L5.72976 17.14L9.49976 15.14C9.65951 15.0806 9.83261 15.0667 9.99976 15.1Z"
                                    fill="#fbbf24"
                                />
                            </svg>
                        </div>
                        <p className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 font-normal text-base leading-4 text-gray-700 hover:underline hover:text-gray-800 duration-100 cursor-pointer text-gray-600 dark:text-gray-200">{product?.ratingsCount || 23} reviews</p>
                    </div>
                    <p className='font-semibold text-xs border w-fit px-2 mt-4 bg-amber-200 py-[2px] uppercase text-black'>{date}</p>
                    <div className="lg:mt-11 mt-10">
                        <hr className=" bg-gray-200 w-full my-2" />
                        <div className=" flex flex-row justify-between items-center mt-4">
                            <p className="font-medium text-base leading-4 text-gray-600 dark:text-gray-200">Model</p>
                            <p className="font-medium text-base leading-4 text-gray-600 dark:text-gray-200">{model}</p>
                        </div>
                        <hr className=" bg-gray-200 w-full mt-4" />
                    </div>
                    <p className=" font-normal text-base leading-6 text-gray-600 dark:text-gray-200 mt-7 text-justify">{details ? details : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using. Lorem Ipsum is that it has a more-or-less normal distribution of letters."}</p>
                    <div className='flex justify-between mt-6'>
                        <p className='text-base leading-6 text-gray-600 dark:text-gray-200'>Location : {location}</p>
                        <p className='text-base leading-6 text-gray-600 dark:text-gray-200'>
                            {
                                differenceInYears(
                                    new Date(),
                                    new Date(year),
                                )
                            } years used</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-2'>
                            <p className='capitalize my-2 text-base leading-6 text-gray-600 dark:text-gray-200'>
                                Seller name : {sellerName}
                            </p>
                            <div>
                                {sellers?.map(seller => {
                                    if ((seller.uid === uid) && seller?.verify == true) {
                                        return <div className='bg-sky-400 rounded-full'>
                                            <span className='text-white'><TiTick /></span>
                                        </div>
                                    }
                                })}
                            </div>
                        </div>
                        <div>
                            <p className='capitalize my-2 text-base leading-6 text-gray-600 dark:text-gray-200'>
                                {condition} condition
                            </p>
                        </div>
                    </div>
                    <p className=" font-semibold lg:text-2xl text-xl text-gray-600 dark:text-gray-200 lg:leading-6 leading-5 mt-6 ">$ {resalePrice}</p>
                    <label
                        htmlFor="booking-modal"
                        className="btn hover:bg-amber-400 font-medium text-base leading-4 text-white bg-amber-300 w-full place-content-center py-8 rounded-none lg:mt-12 mt-6" onClick={handleOrder}>BOOK NOW</label>
                    {showModal && <BookingModal item={product} setShowModal={setShowModal} />}
                </div>

                {/* <!-- Preview Images Div For larger Screen--> */}

                <div className=" w-full sm:w-96 md:w-8/12  lg:w-6/12 flex lg:flex-row-reverse flex-col lg:gap-8 sm:gap-6 gap-4">
                    <div className=" w-full lg:w-8/12  flex justify-center items-center">
                        <PhotoView src={image}>
                            <img src={image} className='cursor-zoom-in' alt="" />
                        </PhotoView>
                    </div>
                    <div className=" w-full lg:w-4/12 grid lg:grid-cols-1 sm:grid-cols-4 grid-cols-2 gap-6">
                        <div className="bg-gray-100 flex justify-center items-center py-4">
                            <PhotoView src={image}>
                                <img src={image} className='cursor-zoom-in' alt="" />
                            </PhotoView>
                        </div>
                        <div className="bg-gray-100 flex justify-center items-center py-4">
                            <PhotoView src={image}>
                                <img src={image} className='cursor-zoom-in' alt="" />
                            </PhotoView>
                        </div>
                        <div className="bg-gray-100 flex justify-center items-center py-4">
                            <PhotoView src={image}>
                                <img src={image} className='cursor-zoom-in' alt="" />
                            </PhotoView>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-10 lg:mt-20'>
                <Advertise />
            </div>
        </div>
    )
}

export default ProductDetails;