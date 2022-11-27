import React, { useContext, useState } from 'react'
import { AuthContext } from '../../UserContext/UserContext';
import toast from 'react-hot-toast';
import DataLoadingSpinner from '../DataLoadingSpinner/DataLoadingSpinner';
function ReviewForm({ title, serviceId, insideImage }) {
    const { user, updateState, setUpdateState } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    function handleReview(e) {
        e.preventDefault();
        setLoading(true)
        const form = e.target;
        const Reviewtitle = form.title.value;
        const comment = form.comment.value;
        const time = new Date().valueOf();
        const review = { Reviewtitle, comment, user: user?.uid, userName: user?.displayName, userEmail: user?.email, userImg: user?.photoURL, time, serviceId: serviceId, serviceName: title, serviceImage: insideImage };
        fetch(`https://your-car-server.vercel.app/review`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(review),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.acknowledged) {
                    form.reset();
                    toast.success('review placed succesfully !');
                    setUpdateState(!updateState)
                    setLoading(false)
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    if (loading) {
        return <DataLoadingSpinner />
    }
    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal ">
                <form className="modal-box bg-amber-300 dark:bg-slate-500 relative" onSubmit={handleReview}>
                    <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 bg-amber-400 dark:bg-slate-800 shadow-lg border-0 text-white top-2" onClick={() => setUpdateState(!updateState)}>✕</label>
                    <h3 className="text-lg font-bold ">Question on {title}</h3>
                    <input required type="text" name="title" id="" className="text-black dark:text-white bg-slate-100 dark:bg-slate-600 my-4 w-full input border-0 dark:bg-transparent border-b-2" placeholder='Title' />
                    <textarea required name='comment' className="text-black dark:text-white bg-slate-100 dark:bg-slate-600 textarea textarea-bordered rounded-none w-full text-lg " placeholder="Question"></textarea>
                    <button type='submit' className='w-full p-2 border-2 text-sm font-bold bg-slate-300 hover:bg-slate-200 text-white hover:text-black shadow-lg'>SUBMIT</button>
                </form>
            </div>
        </div>
    )
}

export default ReviewForm;