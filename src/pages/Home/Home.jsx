import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Parallax } from 'react-parallax';
import bg from '../../asset/images/doctor.png'
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
            <Parallax
                blur={{ min: -15, max: 15 }}
                bgImage={bg}
                bgImageAlt="the dog"
                strength={-400}
            >
                Blur transition from min to max
                <div className='h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]' />
            </Parallax>
            <div data-aos="fade-right" data-aos-duration="2000" className='mt-20'>
                <Contact />
            </div>
            <div data-aos="fade-left" data-aos-duration="2000" className='mt-20'>
                <Advertise />
            </div>
        </div>
    )
}

export default Home;