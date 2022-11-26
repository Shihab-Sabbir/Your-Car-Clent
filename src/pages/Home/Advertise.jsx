import { Carousel } from 'flowbite-react';
import React from 'react'
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query'
import addBg from '../../asset/images/addBg.png'
function Advertise() {
    const [add, setAdd] = useState([]);
    const { isLoading, error, data } = useQuery({
        queryKey: ['addvertise'],
        queryFn: () =>
            fetch('http://localhost:5000/product/advertised/true').then(res =>
                res.json()
            )
    })
    if (isLoading) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message;
    console.log(data)

    if (data.length === 0) {
        return
    }

    return (
        <div className='max-w-[900px] mx-auto'>
            <p className='text-center text-3xl font-bold mb-20 text-black dark:text-slate-200'>Advertised <br /> <span className='text-amber-300'>Products</span></p>
            <div className="h-60 sm:h-[400px] xl:h-[400px] 2xl:h-[500px]">
                <Carousel slideInterval={5000}>
                    {
                        data.map(item =>
                            <div key={item._id} className='p-6 h-full w-full flex justify-center items-center rounded-md' style={{ background: `url(${addBg})` }}>
                                <div className='w-full flex items-center justify-between flex-col md:flex-row'>
                                    <div className='md:w-[50%] flex md:flex-col justify-between item-center md:items-start' data-aos="zoom-in-right" data-aos-duration="1000">
                                        <p className='text-black md:block hidden font-bold text-xl md:text-2xl lg:text-4xl 2xl:text-5xl capitalize'>{item.name}</p>
                                        <img src={item.image} className='w-[50%] max-h-[200px] md:w-full md:max-h-full' alt="" />
                                        <div className='flex flex-col gap-3 justify-center md:hidden'>
                                            <p className='text-black font-bold text-lg md:text-2xl lg:text-4xl 2xl:text-5xl capitalize'>{item.name}</p>
                                            <p className='text-black font-serif text-2xl'>${item.resalePrice}</p>
                                        </div>
                                        <p className='text-black md:block hidden font-serif text-3xl'>${item.resalePrice}</p>
                                    </div>
                                    <div className='md:w-[50%] flex md:block'>
                                        <div data-aos="zoom-in-left" data-aos-duration="2000"
                                            className='w-full flex md:block'>
                                            <div className='flex gap-1 items-center justify-center'>
                                                <div className='bg-amber-200  w-[90px] h-[90px] lg:w-[110px] lg:h-[110px] rounded-md m-1 add-info'>
                                                    <div className='flex flex-col text-center justify-evenly h-full'>
                                                        <p className='font-bold text-sm md:text-lg lg:text-xl text-black p-1'>Model</p>
                                                        <p className='capitalize font-thin text-lg lg:text-xl'>{item.model}</p>
                                                    </div>
                                                </div>
                                                <div className='bg-amber-200  w-[90px] h-[90px] lg:w-[110px] lg:h-[110px] rounded-md m-1 add-info'>
                                                    <div className='flex flex-col text-center justify-evenly h-full'>
                                                        <p className='font-bold text-sm md:text-lg lg:text-xl text-black p-1'>Condition</p>
                                                        <p className='capitalize font-thin text-lg lg:text-xl'>{item.condition}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-1 items-center justify-center'>
                                                <div className='hidden md:block w-[90px] h-[90px] lg:w-[110px] lg:h-[110px] rounded-md m-1 add-info'>
                                                    <div className='flex flex-col text-center justify-evenly h-full'>

                                                    </div>
                                                </div>
                                                <div className='bg-amber-200 p-1 min-w-fit h-[90px] lg:w-[110px] lg:h-[110px] rounded-md m-1 add-info'>
                                                    <div className='flex flex-col text-center justify-evenly h-full '>
                                                        <p className='font-bold text-sm md:text-lg lg:text-xl text-black p-1'>Milage</p>
                                                        <p className='capitalize font-thin text-lg lg:text-xl'>{item.milage} Km</p>
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