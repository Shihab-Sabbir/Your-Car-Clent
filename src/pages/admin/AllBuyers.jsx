import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import UserTable from './UserTable';

function AllBuyers() {
    const [buyer, setBuyer] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/users', {
            params: { role: 'buyer' }
        }).then(res => setBuyer(res.data)).catch(err => console.log(err))
    }, [])
    console.log(buyer)
    return (
        <div>
            <UserTable data={buyer} />
        </div>
    )
}

export default AllBuyers