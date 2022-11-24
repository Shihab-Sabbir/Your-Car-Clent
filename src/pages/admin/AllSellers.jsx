import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import UserTable from './UserTable';

function AllSellers() {
    const [sellers, setSellers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/users', {
            params: { role: 'seller' }
        }).then(res => setSellers(res.data)).catch(err => console.log(err))
    }, [])
    console.log(sellers)
    return (
        <div>
            <UserTable data={sellers} />
        </div>
    )
}

export default AllSellers;