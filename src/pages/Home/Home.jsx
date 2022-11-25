import React from 'react'
import { useEffect } from 'react';
import { Parallax } from 'react-parallax';
import bg from '../../asset/images/parallax.png'
import AOS from 'aos';
import 'aos/dist/aos.css';
import Banner from './Banner';
import Category from './Category';
import Advertise from './Advertise';
import Contact from './Contact';
function Home() {
    useEffect(() => {
        AOS.init();
    }, [])
    window.addEventListener('resize', () => {
        AOS.refresh();
        console.log('resizing')
    })
    return (
        <div>
            <Banner />
            <div data-aos="fade-down" data-aos-duration="2000">

            </div>
            <div data-aos="fade-up"
                data-aos-duration="2000">
                <Category />
            </div>
            <div className='my-[100px] relative lg:mt-28'>
                <Parallax
                    // blur={{ min: -15, max: 15 }}
                    bgImage={bg}
                    bgImageAlt="bmw"
                    strength={300}
                >
                    <div className='absolute left-20 lg:top-32 '>
                        <p className='text-2xl md:text-4xl text-amber-400 font-bold my-4'>Any Question ?</p>
                        <p className='text-xl md:text-2xl font-semibold text-white'>We will answe you 24/7</p>
                        <button className='btn mt-6 bg-amber-400 border-0 text-slate-100 shadow-md dark:hover:border-white dark:hover:border'>Contact US</button>
                    </div>
                    <div className='h-[200px] md:h-[400px] lg:h-[600] xl:h-[700px]' />
                </Parallax>
            </div>
            <div data-aos="fade-left" data-aos-duration="2000" className='mt-8'>
                <div className='py-[100px]'>
                    <Advertise />
                </div>
            </div>
            <div data-aos="fade-right" data-aos-duration="2000" className='py-20'>
                <Contact />
            </div>
        </div>
    )
}

export default Home;