import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Parallax } from 'react-parallax';
import bg from '../../asset/images/doctor.png'
import HomeBody from './HomeBody';
import Part1 from './Part1';
import AOS from 'aos';
import 'aos/dist/aos.css';
function Home() {
    const [data, setData] = useState([]);
    const [image, setImage] = useState(null);
    useEffect(() => {
        AOS.init();
        axios.get('http://localhost:5000/services').then(services => setData(services));
        axios.post(`http://localhost:5000/trial`, {
            firstName: 'shihab',
            lastName: 'sabbir',
        }).then(result => { });
        //     const headers = {
        //         'Content-Type': 'application/json',
        //         'Authorization': 'JWT fefege...'
        //     }
        //     axios.post("http://localhost:5000/trial", {}, {
        //         //first for url , secont empty object is for body , third one for headers
        //         headers: headers
        //     })
        //         .then(res => console.log(res))
        //         .catch(err => console.log(err))

    }, [])
    const handleImage = e => {
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_Imgbb_Key}`;
        const formData = new FormData;
        setImage(URL.createObjectURL(e.target.files[0]));
        formData.append('image', e.target.files[0])
        axios.post(url, formData).then(res => console.log(res));
    }
    window.addEventListener('resize', () => {
        AOS.refresh();
        console.log('resizing')
    })
    return (
        <div>

            <img src={image} alt="" />
            <input type="file" accept='image/*' name='image' onChange={(e) => handleImage(e)} />
            <div data-aos="fade-down" data-aos-duration="2000">
                <Part1 />
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
            <div data-aos="fade-up"
                data-aos-duration="2000">
                <Part1 />
            </div>
            <div data-aos="fade-left" data-aos-duration="2000" className='mt-20'>
                <Part1 />
            </div>
        </div>
    )
}

export default Home;