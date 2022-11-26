import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';
import { AuthContext } from '../../UserContext/UserContext';
import UserTable from './UserTable';

function AllSellers() {
    const [sellers, setSellers] = useState([]);
    const [updateState, setUpdateState] = useState(false);
    const { loading } = useContext(AuthContext);

    useEffect(() => {
        axios.get('https://your-car-server.vercel.app/users', {
            params: { role: 'seller' }
        }).then(res => setSellers(res.data)).catch(err => console.log(err))
    }, [updateState])

    if (loading) {
        return <DataLoadingSpinner />
    }

    return (
        <div>
            <UserTable data={sellers} updateState={updateState} setUpdateState={setUpdateState} />
        </div>
    )
}

export default AllSellers;