import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';
import { AuthContext } from '../../UserContext/UserContext';
import UserTable from './UserTable';

function AllBuyers() {
    const [buyer, setBuyer] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const { loading, updateState, setUpdateState } = useContext(AuthContext);

    useEffect(() => {
        setDataLoading(true)
        axios.get('https://your-car-server.vercel.app/users?role=buyer', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('your-car-token')}`
            }
        }).then(res => { setBuyer(res.data); setDataLoading(false) }).catch(err => { console.log(err); setDataLoading(false) })
    }, [updateState])

    if (loading || dataLoading) {
        return <DataLoadingSpinner />
    }

    return (
        <div>
            <UserTable data={buyer} updateState={updateState} setUpdateState={setUpdateState} />
        </div>
    )
}

export default AllBuyers