import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../UserContext/UserContext';
import { Helmet } from "react-helmet";
import { PhotoView } from 'react-photo-view';
import { Dropdown, Pagination } from 'flowbite-react';
function Search() {
    const [services, setServices] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(6);
    const [dataLength, setDataLength] = useState(1);
    const { loading, setLoading, search } = useContext(AuthContext);
    const pageSize = Math.ceil(dataLength / limit);
    const navigate = useNavigate();
    useEffect(() => {
        if (search?.length === 0) {
            return navigate('/');
        }
        fetch(`https://assignment-11-five.vercel.app/search?limit=${limit}&page=${page}&search=${search}`).then(res => res.json()).then(data => { setServices(data.services); setDataLoading(false); setDataLength(parseInt(data?.length)) }).catch(err => console.log(err));
    }, [page, limit, search])

    if (search?.length === 0) {
        return navigate('/');
    }

    function onPageChange(e) {
        setPage(e - 1);
    }

    if (loading || dataLoading) {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
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
    function onClick(e) {
        if (e.target.innerText === 'All') {
            setPage(0);
            setLimit(parseInt(dataLength));
        }
        else {
            setPage(0)
            setLimit(parseInt(e.target.innerText));
        }
    }
    if (services?.length === 0) {
        return (
            <div className='mt-20'>
                <p className='font-bold text-center uppercase'>sorry , No match Found !</p>
            </div>
        )
    }
    return (
        <div className="bg-transparent py-[20px]">
            <Helmet>
                <title>Smile - Search</title>
            </Helmet>
            <div className="w-full lg:w-[1200px] mx-auto container">
                <div className='my-5 flex justify-end mr-5'>
                    <Dropdown
                        label="Select Page Size"
                        inline={true}
                        dismissOnClick={true}
                        placement="right-start"
                    >
                        <Dropdown.Item value='1' >
                            <p className='min-h-full min-w-full p-3 px-5 border border-[#00ACBD] text-[#00ACBD]  rounded-lg text-center' onClick={(e) => onClick(e)}>1</p>
                        </Dropdown.Item>
                        <Dropdown.Item value='1' >
                            <p className='min-h-full min-w-full p-3 px-5 border border-[#00ACBD] text-[#00ACBD] rounded-lg text-center' onClick={(e) => onClick(e)}>3</p>
                        </Dropdown.Item>
                        <Dropdown.Item value='1' >
                            <p className='min-h-full min-w-full p-3 px-5 border border-[#00ACBD] text-[#00ACBD] rounded-lg text-center' onClick={(e) => onClick(e)}>6</p>
                        </Dropdown.Item>
                        <Dropdown.Item value='1' >
                            <p className='min-h-full min-w-full p-3 px-5 border border-[#00ACBD] text-[#00ACBD] rounded-lg text-center' onClick={(e) => onClick(e)}>All</p>
                        </Dropdown.Item>
                    </Dropdown>
                </div>
                <div className='flex justify-start items-center flex-col'>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">

                        {
                            services?.map(service =>
                                <div className=" w-72 lg:mb-0" key={service._id}>
                                    <div>
                                        <PhotoView src={service?.displayImage}>
                                            <img src={service?.displayImage} className="w-full h-44 cursor-zoom-in dark:brightness-75" title='Click to zoom' />
                                        </PhotoView>
                                    </div>
                                    <div className="bg-white dark:bg-slate-400">
                                        <div className="flex items-center justify-between px-4 pt-4">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                    <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                                                </svg>
                                            </div>
                                            <Link to={`/service/details/${service?._id}`} className="bg-yellow-200 py-1.5 px-6 rounded-full">
                                                <p className="text-xs text-yellow-500">Details</p>
                                            </Link>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex items-center min-h-[56px]">
                                                <h2 className="text-lg font-semibold dark:text-gray-300">{service?.title}</h2>
                                            </div>
                                            <p className="text-xs text-gray-600 mt-2">{service?.description1?.length > 100 ? service?.description1?.slice(0, 100) + "..." : service?.description1}</p>
                                            <div className="flex mt-4">
                                                <div>
                                                    <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">Treatment duration :<span className='pl-1 font-bold'>{service?.treatmentTime}</span></p>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between py-4">
                                                <h2 className="text-indigo-700 text-xs font-semibold">{service?.clinicName}</h2>
                                                <h3 className="text-indigo-700 text-xl font-semibold">${service?.price}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
                <div className='flex justify-center items-center my-10'>
                    <Pagination
                        currentPage={page + 1}
                        onPageChange={onPageChange}
                        showIcons={true}
                        totalPages={pageSize}
                    />
                </div>
            </div>
        </div>
    )
}

export default Search;