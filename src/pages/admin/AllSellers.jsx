import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

function AllSellers() {
    const [sellers, setSellers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/user', {
            params: {
                role: 'seller'
            }
        }).then(res => setSellers(res.data)).catch(err => console.log(err))
    }, [])

    return (
        <div>AllSellers</div>
    )
}

export default AllSellers;