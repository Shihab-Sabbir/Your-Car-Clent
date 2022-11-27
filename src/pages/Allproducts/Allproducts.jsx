import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../UserContext/UserContext';
import { Helmet } from "react-helmet";
import { Dropdown, Pagination } from 'flowbite-react';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner'
import DisplayProducts from '../../component/DisplayProducts/DisplayProducts';

function Allproducts() {
    const [products, setProducts] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(6);
    const [dataLength, setDataLength] = useState(1);
    const { loading, updateState } = useContext(AuthContext);
    const pageSize = Math.ceil(dataLength / limit);
    useEffect(() => {
        window.scrollTo(0, 0)
        fetch(`https://your-car-server.vercel.app/all-products?limit=${limit}&page=${page}`).then(res => res.json()).then(data => { setProducts(data.products); setDataLoading(false); setDataLength(parseInt(data?.length)); console.log(data) }).catch(err => { console.log(err); setDataLoading(false) });
    }, [page, limit, updateState])

    function onPageChange(e) {
        setPage(e - 1);
    }

    if (loading || dataLoading) {
        return (
            <DataLoadingSpinner />
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
    if (products?.length === 0) {
        return (
            <div className='mt-20'>
                <p className='font-bold px-10  text-center uppercase'>sorry , No match Found !</p>
            </div>
        )
    } 
    return (
        <div className="bg-transparent py-[20px]">
            <Helmet>
                <title>Your Car - Search</title>
            </Helmet>
            <div className="w-full lg:w-[1600px] mx-auto container">
                <div className='my-5 flex justify-end text-black dark:text-amber-300 mr-5'>
                    <Dropdown
                        label="Select Page Size"
                        inline={true}
                        dismissOnClick={true}
                        placement=""
                    >
                        <Dropdown.Item value='1' >
                            <p className='min-h-full min-w-full font-bold px-10  dark:text-amber-400  rounded-lg text-center' onClick={(e) => onClick(e)}>1</p>
                        </Dropdown.Item>
                        <Dropdown.Item value='1' >
                            <p className='min-h-full min-w-full font-bold px-10  dark:text-amber-400 rounded-lg text-center' onClick={(e) => onClick(e)}>3</p>
                        </Dropdown.Item>
                        <Dropdown.Item value='1' >
                            <p className='min-h-full min-w-full font-bold px-10  dark:text-amber-400 rounded-lg text-center' onClick={(e) => onClick(e)}>6</p>
                        </Dropdown.Item>
                        <Dropdown.Item value='1' >
                            <p className='min-h-full min-w-full font-bold px-10  dark:text-amber-400 rounded-lg text-center' onClick={(e) => onClick(e)}>All</p>
                        </Dropdown.Item>
                    </Dropdown>
                
                </div>
                <DisplayProducts data={products} />
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

export default Allproducts;