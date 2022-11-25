import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import UserTable from './UserTable';

function AllSellers() {
    const [sellers, setSellers] = useState([]);
    const [updateState, setUpdateState] = useState(false);
    const { loading } = useContext(AuthContext);

    useEffect(() => {
        axios.get('http://localhost:5000/users', {
            params: { role: 'seller' }
        }).then(res => setSellers(res.data)).catch(err => console.log(err))
    }, [updateState])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <UserTable data={sellers} updateState={updateState} setUpdateState={setUpdateState} />
        </div>
    )
}

export default AllSellers;