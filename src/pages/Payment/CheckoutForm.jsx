import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useContext, useState } from 'react'
import { logEvent, Result, ErrorResult } from './utils.js';
import './style.css';
import { AuthContext } from '../../UserContext/UserContext.jsx';
import Icons from './Icons.jsx';
import CvcSvg from './CvcSvg.jsx';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../Utility/logout.js';

const ELEMENT_OPTIONS = {
    style: {
        base: {
            fontSize: '18px',
            color: '#424770',
            letterSpacing: '0.025em',
            '::placeholder': {
                color: '#aab7c4',
            },
        },
        invalid: {
            color: '#9e2146',
        },
    },
};

function CheckoutForm({ price, id }) {
    const elements = useElements();
    const stripe = useStripe();
    const [name, setName] = useState('');
    const [postal, setPostal] = useState('');
    const [processing, setProcessing] = useState(false)
    const [secret, setSecret] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const { user, setUser, setDbUser, updateState, setUpdateState } = useContext(AuthContext);
    const uid = user?.uid
    const navigate = useNavigate();
    useEffect(() => {
        fetch('https://your-car-server.vercel.app/payment-intents', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        }).then(res => res.json()).then(data => setSecret(data?.client_secret)).catch(err => console.log(err));
    }, [price])

    const handlePayment = (id, txId) => {
        const date = new Date();
        fetch(`https://your-car-server.vercel.app/payment/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('your-car-token')}`
            },
            body: JSON.stringify({ txId, date, uid })
        }).then(res => {
            if (res.status == 403) {
                return logOut(user, setUser, navigate, setDbUser);
            }
            else { return res.json() }
        }).then(data => {
            if (data.matchedCount) {
                navigate('/dashboard/my-orders')
            }
        }).catch(err => console.log(err));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true)
        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        const card = elements.getElement(CardNumberElement);

        if (card == null) {
            return;
        }

        const { paymentIntent, error } = await stripe.confirmCardPayment(
            secret, {
            payment_method: {
                card,
                billing_details: {
                    name: user?.displayName,
                    email: user?.email,
                    address: {
                        postal_code: postal,
                    },
                },
            },
        },
        );
        if (error) {
            setErrorMessage(error.message);
            toast.error(<ErrorResult>{errorMessage}</ErrorResult>);
            setProcessing(false)
            return;
        }
        else {
            setErrorMessage(null);
            if (paymentIntent.status === "succeeded") {
                elements.getElement(CardNumberElement).clear();
                elements.getElement(CardCvcElement).clear();
                elements.getElement(CardExpiryElement).clear();
                toast.success(`Payment successful , Transection Id : ${paymentIntent?.id} , Please Reload before next payment`);
                navigate('/dashboard/my-orders')
                setProcessing(false);
                handlePayment(id, paymentIntent?.id);
            }
        }
    };

    return (
        <div className='flex px-1 flex-col justify-center h-full relative'>
            <button className='absolute -top-5 md:top-[0] left-4 mb-4 btn btn-xs w-fit dark:bg-slate-200 dark:text-slate-900 text-slate-800 hover:text-slate-200 bg-amber-300 shadow  border-none' onClick={() => navigate('/dashboard')}>Back</button>
            <p className='text-center text-xl mb-4 font-bold text-amber-400'>Stripe Payment</p>
            <form onSubmit={handleSubmit} className='payment-form border p-3 max-w-[320px] sm:max-w-[400px] shadow-lg bg-transparent dark:bg-slate-800 dark:shadow-sky-800' >
                <label className='text-black dark:text-white ' htmlFor="name">User Name</label>
                <input
                    id="name"
                    required
                    placeholder="Jenny Rosen"
                    defaultValue={user?.displayName}
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                />
                <div className='relative'>
                    <label className='text-black dark:text-white ' htmlFor="cardNumber">Card Number</label>
                    <CardNumberElement
                        id="cardNumber"
                        onBlur={logEvent('blur')}
                        onChange={logEvent('change')}
                        onFocus={logEvent('focus')}
                        onReady={logEvent('ready')}
                        options={ELEMENT_OPTIONS}
                    />
                    <div className='absolute top-[47px] right-1'><Icons /></div>
                </div>
                <label className='text-black dark:text-white ' htmlFor="expiry">Card Expiration</label>
                <CardExpiryElement
                    id="expiry"
                    onBlur={logEvent('blur')}
                    onChange={logEvent('change')}
                    onFocus={logEvent('focus')}
                    onReady={logEvent('ready')}
                    options={ELEMENT_OPTIONS}
                />
                <div className='relative'>
                    <label className='text-black dark:text-white ' htmlFor="cvc">CVC</label>
                    <CardCvcElement
                        id="cvc"
                        onBlur={logEvent('blur')}
                        onChange={logEvent('change')}
                        onFocus={logEvent('focus')}
                        onReady={logEvent('ready')}
                        options={ELEMENT_OPTIONS}
                    />
                    <div className='absolute top-[42px] right-1'><CvcSvg /></div>
                </div>
                <label className='hidden text-black dark:text-white ' htmlFor="postal" >Postal Code</label>
                <input
                    id="postal"
                    required
                    placeholder="12345"
                    value='12345'
                    onChange={(e) => {
                        setPostal(e.target.value);
                    }}
                    className='hidden'
                />

                <button type="submit" className='btn text-black dark:border-white bg-amber-300 dark:border border-0 dark:hover:text-white hover:text-white' disabled={!stripe || !secret || processing || !price || !id}>
                    Pay Now
                </button>
            </form>

        </div>
    )
}

export default CheckoutForm;