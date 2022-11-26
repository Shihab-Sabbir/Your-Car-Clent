import React from 'react'
import toast from 'react-hot-toast';
import spinner from '../../asset/smallSpiner.gif'
import { useContext } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import { useState } from 'react';
function BookingModal({ item, setShowModal }) {
    const [loading, setLoading] = useState(false)
    const { user } = useContext(AuthContext)

    const handleBooking = event => {
        event.preventDefault();
        setLoading(true)
        const form = event.target;
        const price = form.price.value;
        const image = item?.image;
        const email = form.email.value;
        const phone = form.phone.value;
        const meeting = form.meetingPlace.value;
        const productName = form.productName.value;
        const sellerName = item?.sellerName;
        const sellerUid = item?.uid;
        const buyerName = user?.DisplayName;
        const uid = user?.uid;
        const carId = item?._id
        const booking = {
            price,
            email,
            phone,
            meeting,
            productName,
            sellerName,
            sellerUid,
            buyerName,
            uid,
            image,
            carId
        }

        fetch(`https://your-car-server.vercel.app/order`, {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('your-car-token')}`
            },
            body: JSON.stringify(booking)
        }).then(res => {
            console.log(res, res.status)
            if (res.status == 503) {
                setLoading(false)
                setShowModal(false)
                toast.error('You have already book this item !')
                return
            }
            else {
                return res.json();
            }
        }).then(data => {
            if (data.acknowledged) {
                toast.success('Order placed !');
                setShowModal(false);
                setLoading(false)
            }
            else {
                toast.error(data.massege);
                setLoading(false)
            }
        }).catch(err => console.log(err))
    }

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm bg-amber-300 text-black btn-circle absolute right-2 top-2">✕</label>
                    <form onSubmit={handleBooking} className='grid grid-cols-1 gap-3 my-10'>
                        <input name="productName" disabled defaultValue={item?.name} className="my-1  text-white  input w-full input-bordered " />
                        <input name="price" defaultValue={item?.resalePrice} disabled className="my-1  text-white   input w-full input-bordered" />
                        <input type="text" name='buyerName' disabled value={user?.displayName} className="my-1  text-white   input w-full input-bordered " />
                        <input name="email" defaultValue={user?.email} disabled className="bg-slate-200 dark:bg-slate-800 my-1 text-white   input w-full input-bordered" />
                        <input type="text" name='meetingPlace' className="bg-slate-200 dark:bg-slate-800 my-1 dark:text-slate-200 text-black input w-full input-bordered " placeholder="Meeting Place" />
                        <input name="phone" type="tel" placeholder="Phone Number" className="bg-slate-200 dark:bg-slate-800 my-1 dark:text-slate-200 text-black  input w-full input-bordered" />
                        <button type='submit' className={`bg-amber-300 rounded-lg text-black py-3 w-full hover:bg-amber-500 hover:text-white p-2 font-bold text-xs ${loading ? 'btn-disabled' : ''}`}>{loading ? <div className='flex gap-2 justify-center items-center'>
                            <img src={spinner} className='w-8' /> <p>Loading...</p>
                        </div> : 'SUBMIT'}</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default BookingModal;