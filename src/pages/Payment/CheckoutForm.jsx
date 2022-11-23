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

function CheckoutForm() {
    const elements = useElements();
    const stripe = useStripe();
    const [name, setName] = useState('');
    const [postal, setPostal] = useState('');
    const [processing, setProcessing] = useState(false)
    const [secret, setSecret] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        const price = 900;
        fetch('http://localhost:5000/payment-intents', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ price })
        }).then(res => res.json()).then(data => setSecret(data?.client_secret)).catch(err => console.log(err));
    }, [])

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
                setProcessing(false)
            }
        }
    };

    return (
        <div className='flex px-1 flex-col justify-center h-full relative'>
            <button className='absolute -top-5 md:top-[0] left-4 mb-4 btn btn-xs w-fit dark:bg-slate-200 dark:text-slate-900 text-slate-200 bg-slate-900 shadow  border-none' onClick={() => navigate('/dashboard')}>Back</button>
            <p className='text-center text-xl mb-4 font-bold'>Stripe Payment</p>
            <form onSubmit={handleSubmit} className='border p-3 max-w-[320px] sm:max-w-[400px] shadow-lg bg-transparent dark:bg-slate-800 dark:shadow-sky-800' >
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

                <button type="submit" className='btn text-black dark:border-white dark:text-white hover:text-white' disabled={!stripe || !secret || processing}>
                    Pay Now
                </button>
            </form>

        </div>
    )
}

export default CheckoutForm;