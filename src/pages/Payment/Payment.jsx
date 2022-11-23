import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react'
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe("pk_test_51M6ASuFYDMLeNVaQCwHq9jco0SCMUiANa4YcODdYzhmHIk40aV4sBkcGCwdsfHbeXza2Nk1CF0e7wrb8osPkV8xy00fXPfdPhn");

function Payment() {

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}

export default Payment;