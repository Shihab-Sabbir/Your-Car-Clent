import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../UserContext/UserContext';
import { Helmet } from "react-helmet";
import { PhotoView } from 'react-photo-view';
import { Dropdown, Pagination } from 'flowbite-react';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner'
import DisplayProducts from '../../component/DisplayProducts/DisplayProducts';
function Search() {
    const [products, setProducts] = useState([]);
    const [dataLoading, setDataLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(6);
    const [dataLength, setDataLength] = useState(1);
    const { loading, search, updateState } = useContext(AuthContext);
    const pageSize = Math.ceil(dataLength / limit);
    const navigate = useNavigate();
    useEffect(() => {
        if (search?.length === 0) {
            return navigate('/');
        }
        fetch(`https://your-car-server.vercel.app/search?limit=${limit}&page=${page}&search=${search}`).then(res => res.json()).then(data => { setProducts(data.products); setDataLoading(false); setDataLength(parseInt(data?.length)); console.log(data) }).catch(err => { console.log(err); setDataLoading(false) });
    }, [page, limit, search, updateState])
    window.addEventListener('load', () => {
        navigate('/');
    })

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
                <p className='font-bold text-center uppercase'>sorry , No match Found !</p>
            </div>
        )
    }
    return (
        <div className="bg-transparent py-[20px]">
            <Helmet>
                <title>Your Car - Search</title>
            </Helmet>
            <div className="w-full lg:w-[1600px] mx-auto container">
                <div className='my-5 flex justify-end mr-5'>
                    <Dropdown
                        label="Select Page Size"
                        inline={true}
                        dismissOnClick={true}
                        placement="right-start"
                    >
                        <Dropdown.Item value='1' >
                            <p className='min-h-full min-w-full p-3 px-5 border border-amber-400 text-amber-400  rounded-lg text-center' onClick={(e) => onClick(e)}>1</p>
                        </Dropdown.Item>
                        <Dropdown.Item value='1' >
                            <p className='min-h-full min-w-full p-3 px-5 border border-amber-400 text-amber-400 rounded-lg text-center' onClick={(e) => onClick(e)}>3</p>
                        </Dropdown.Item>
                        <Dropdown.Item value='1' >
                            <p className='min-h-full min-w-full p-3 px-5 border border-amber-400 text-amber-400 rounded-lg text-center' onClick={(e) => onClick(e)}>6</p>
                        </Dropdown.Item>
                        <Dropdown.Item value='1' >
                            <p className='min-h-full min-w-full p-3 px-5 border border-amber-400 text-amber-400 rounded-lg text-center' onClick={(e) => onClick(e)}>All</p>
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

export default Search;