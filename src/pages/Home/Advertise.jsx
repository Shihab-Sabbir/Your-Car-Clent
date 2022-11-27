import { Carousel } from 'flowbite-react';
import React from 'react'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import addBg from '../../asset/images/addBg.png'
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';
import { Link } from 'react-router-dom';
function Advertise() {
    const [add, setAdd] = useState([]);
    const { isLoading, error, data } = useQuery({
        queryKey: ['addvertise'],
        queryFn: () =>
            fetch('https://your-car-server.vercel.app/product/advertised/true').then(res =>
                res.json()
            )
    })
    if (isLoading) return <DataLoadingSpinner />

    if (error) return 'An error has occurred: ' + error.message;

    if (data.length === 0) {
        return
    }

    return (
        <div className='max-w-[900px] mx-auto p-1'>
            <p className='text-center text-3xl font-bold mb-10 md:mb-20 text-black dark:text-slate-200'>Advertised <br /> <span className='text-amber-300'>Products</span></p>
            <div className="h-60 sm:h-[400px] xl:h-[400px] 2xl:h-[500px]">
                <Carousel slideInterval={5000}>
                    {
                        data.map(item =>
                            <div key={item._id} className='p-6 h-full w-full flex justify-center items-center rounded-md relative' style={{ background: `url(${addBg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
                                <div className='w-full flex items-center justify-between flex-col md:flex-row'>
                                    <Link to={`/product-details/${item._id}`} className="absolute top-1 right-6 text-black font-bold shadow-lg opacity-75 bg-slate-100 py-[1px] px-1 rounded-md"> Click to view details</Link>
                                    <div className='md:w-[50%] min-h-[130px] flex md:flex-col justify-evenly md:justify-between item-center md:items-start' data-aos="zoom-in-right" data-aos-duration="1000">
                                        <p className='text-black md:block hidden font-bold text-xl md:text-2xl lg:text-4xl 2xl:text-5xl capitalize'>{item.name}</p>
                                        <img src={item.image} className='w-[50%] h-[130px] md:h-[300px] md:w-full max-h-full' alt="" />
                                        <div className='flex flex-col gap-3 justify-center md:hidden'>
                                            <p className='text-black font-bold text-lg md:text-2xl lg:text-4xl 2xl:text-5xl capitalize'>{item.name}</p>
                                            <p className='text-black font-serif text-2xl'>${item.resalePrice}</p>
                                        </div>
                                        <p className='text-black md:block hidden font-serif font-bold text-3xl'>${item.resalePrice}</p>
                                    </div>
                                    <div className='md:w-[50%] flex md:block'>
                                        <div
                                            className='w-full flex md:block'>
                                            <div className='flex gap-1 items-center justify-center' data-aos="zoom-in-left" data-aos-duration="2000">
                                                <div className='bg-amber-200  w-[90px] h-[90px] lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px] rounded-xl m-1  add-info shadow-2xl'>
                                                    <div className='flex flex-col text-center justify-evenly h-full'>
                                                        <p className='font-extrabold text-sm md:text-lg lg:text-xl text-black p-1'>Model</p>
                                                        <p className='capitalize font-bold text-gray-700 text-lg lg:text-xl'>{item.model}</p>
                                                    </div>
                                                </div>
                                                <div className='bg-amber-200  w-[90px] h-[90px] lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px] rounded-xl m-1  add-info shadow-2xl' data-aos="zoom-in-right" data-aos-duration="2000">
                                                    <div className='flex flex-col text-center justify-evenly h-full'>
                                                        <p className='font-extrabold text-sm md:text-lg lg:text-xl text-black p-1'>Condition</p>
                                                        <p className='capitalize font-bold text-gray-700 text-lg lg:text-xl'>{item.condition}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 items-center justify-center md:mt-8' data-aos="fade-up" data-aos-duration="2000">
                                                {/* <div className='hidden md:block w-[90px] h-[90px] lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px] rounded-xl m-1 add-info shadow-2xl'>
                                                    <div className='flex flex-col text-center justify-evenly h-full'>

                                                    </div>
                                                </div> */}
                                                <div className='bg-amber-200  w-[90px] h-[90px] lg:w-[140px] lg:h-[140px] xl:w-[160px] xl:h-[160px] rounded-xl m-1  add-info shadow-2xl'>
                                                    <div className='flex flex-col text-center justify-evenly h-full '>
                                                        <p className='font-extrabold text-sm md:text-lg lg:text-xl text-black p-1'>Milage</p>
                                                        <p className='capitalize font-bold text-gray-700 text-lg lg:text-xl'>{item.milage} Km</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </Carousel>
            </div>
        </div>
    )
}

export default Advertise;