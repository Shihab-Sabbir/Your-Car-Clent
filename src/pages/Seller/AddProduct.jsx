import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { ImCross } from 'react-icons/im'
import { PhotoView } from 'react-photo-view';
import { AuthContext } from '../../UserContext/UserContext';
import spinner from '../../asset/smallSpiner.gif'
function AddProduct() {
  const [previewImage, setPreviewImage] = useState(null);
  const [image, setImage] = useState(null)
  const [loading, setloading] = useState(false)
  const handleImageChange = e => {
    setImage(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  }
  const { user } = useContext(AuthContext);
  const handleFormSubmit = e => {
    e.preventDefault();
    setloading(true);
    if (previewImage === null) {
      return toast.error('Please add an image')
    }
    else {
      const form = e.target;
      const name = form.carName.value
      const model = form.model.value
      const milage = form.milage.value
      const category = form.category.value
      const marketPrice = form.marketPrice.value
      const resalePrice = form.resalePrice.value
      const year = form.year.value;
      const condition = form.condition.value
      const location = form.location.value
      const mobile = form.mobile.value
      const details = form.details.value
      const formData = new FormData;
      const uid = user?.uid
      formData.append('image', image);
      fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_Imgbb_Key}`, {
        method: 'POST',
        body: formData
      }).then(res => res.json()).then(data => {
        const product = { name, model, milage, year, category, condition, marketPrice, resalePrice, image: data.data.display_url, location, mobile, details, uid };
        axios.post('http://localhost:5000/add-product', product).then(res => {
          console.log(data)
          if (data.insertedId || data.success) {
            toast.success('Product added successfully');
          }
          setloading(false)
        }).catch(error => {
          console.log(error);
          setloading(false)
        })
      }).catch(error => {
        console.log(error);
        setloading(false)
      });
    }

  }
  return (
    <div className='flex flex-col justify-center items-center mt-10'>
      <p className='text-slate-800 dark:text-slate-200'>ADD CAR</p>
      <form action="" onSubmit={handleFormSubmit}>
        <div className='flex gap-2'>
          <input required className='bg-gray-50 text-slate-800 dark:text-slate-200 dark:hover:bg-bray-800 dark:bg-gray-700' type="text" placeholder='Name' name='carName' />
          <input required className='bg-gray-50 text-slate-800 dark:text-slate-200 dark:hover:bg-bray-800 dark:bg-gray-700' type="text" placeholder='Model' name='model' />
          <input required className='bg-gray-50 text-slate-800 dark:text-slate-200 dark:hover:bg-bray-800 dark:bg-gray-700' type="number" placeholder='Purchase Year' name='year' />
        </div>
        <div className='flex gap-4 w-full'>
          <div className='flex-col flex-1'>
            <label htmlFor="role" className="block dark:text-gray-400 text-slate-800 text-xs uppercase">Select category</label>
            <select className="select-bordered w-full text-sm bg-gray-50 text-slate-800 dark:text-slate-200 dark:hover:bg-bray-800 dark:bg-gray-700" name='category'>
              <option defaultChecked value='sedan'>Sedan</option>
              <option value='microbus'>Microbus</option>
              <option value='suv'>SUV</option>
              <option value='luxury-car'>Luxury car</option>
              <option value='mpv'>MPV</option>
            </select>
          </div>
          <div className='flex-col flex-1'>
            <label htmlFor="role" className="block dark:text-gray-400 text-slate-800 text-xs uppercase">Select condition</label>
            <select className="select-bordered w-full text-sm bg-gray-50 text-slate-800 dark:text-slate-200 dark:hover:bg-bray-800 dark:bg-gray-700" name='condition'>
              <option defaultChecked value='excellent'>Excellent</option>
              <option value='good'>Good</option>
              <option value='bad'>Bad</option>
            </select>
          </div>
        </div>
        <input required className='bg-gray-50 text-slate-800 dark:text-slate-200 dark:hover:bg-bray-800 dark:bg-gray-700' type="number" name="milage" placeholder='Milage (km)' />
        <div className="flex flex-col items-center justify-center w-full">
          {previewImage !== null && <div className='relative'>
            <PhotoView src={previewImage}>
              <img src={previewImage} className='!w-[110px] !h-[100px]cursor-zoom-in border-2 p-1' aria-disabled alt="" />
            </PhotoView>
            <p className='absolute top-[-8px] right-[-15px] rounded-full px-1 text-red-600 cursor-pointer text-xl' onClick={() => setPreviewImage(null)}><ImCross /></p>
          </div>}
          {previewImage === null && <label htmlFor="dropzone-file" className="flex flex-col p-1 items-center justify-center w-full h-[125px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 text-slate-800 dark:text-slate-200 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
              <p className="mb-2 text-sm dark:text-gray-400 text-slate-800"><span className="font-semibold">Click to upload user image</span></p>
              <p className="text-xs dark:text-gray-400 text-slate-800">SVG, PNG, JPG or GIF</p>
            </div>
            <input id="dropzone-file" type="file" accept='image/*' name='image' className="hidden" onChange={(e) => handleImageChange(e)} />
          </label>}
        </div>
        <div className='flex gap-2 mt-2'>
          <input required className='bg-gray-50 text-slate-800 dark:text-slate-200 dark:hover:bg-bray-800 dark:bg-gray-700' type="number" name="marketPrice" placeholder='Market Price (USD)' />
          <input required className='bg-gray-50 text-slate-800 dark:text-slate-200 dark:hover:bg-bray-800 dark:bg-gray-700' type="number" name="resalePrice" placeholder='Resale Price (USD)' />
        </div>
        <div className='flex gap-2'>
          <input required className='bg-gray-50 text-slate-800 dark:text-slate-200 dark:hover:bg-bray-800 dark:bg-gray-700' type="text" placeholder='Mobile' name='mobile' />
          <input required className='bg-gray-50 text-slate-800 dark:text-slate-200 dark:hover:bg-bray-800 dark:bg-gray-700' type="text" placeholder='Location' name='location' />
        </div>
        <textarea required name="details" placeholder='Details...' className='w-full bg-gray-50 text-slate-800 dark:text-slate-200 dark:hover:bg-bray-800 dark:bg-gray-700 border-none shadow text-sm mb-2'></textarea>
        <button className={`bg-amber-300 text-black w-full hover:bg-amber-500 hover:text-white p-2 font-bold text-xs ${loading ? 'disabled' : ''}`}>{loading ? <div className='flex gap-2 justify-center items-center'>
          <img src={spinner} className='w-8' /> <p>Loading...</p>
        </div> : 'ADD CAR'}</button>
      </form>
    </div>
  )
}

export default AddProduct;