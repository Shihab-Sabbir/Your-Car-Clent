import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe("pk_test_51M6ASuFYDMLeNVaQCwHq9jco0SCMUiANa4YcODdYzhmHIk40aV4sBkcGCwdsfHbeXza2Nk1CF0e7wrb8osPkV8xy00fXPfdPhn");

function Payment() {
    const [price, setPrice] = useState(0);
    const [id, setId] = useState(null);

    const location = useLocation();

    useEffect(() => {
        setPrice(location.state?.price)
        setId(location.state?.id)
    }, [location])

    

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm price={price} id={id}  />
        </Elements>
    )
}

export default Payment;