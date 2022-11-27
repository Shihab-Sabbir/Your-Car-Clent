import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';
import { AuthContext } from '../../UserContext/UserContext';
import { logOut } from '../../Utility/logout';
import ReportTable from './ReportTable';

function Reports() {
    const [reports, setReports] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);
    const { loading, updateState, setUpdateState, user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        setDataLoading(true)
        axios.get('https://your-car-server.vercel.app/all-report', {
            headers: {
                authorization: `Bearer ${localStorage.getItem('your-car-token')}`
            }
        }).then(res => { setReports(res.data); setDataLoading(false) }).catch(err => {
            console.log(err);
            setDataLoading(false);
            if (err.response.status == 403) {
                logOut(user, setUser, navigate);
            }
        })
    }, [updateState])


    if (loading || dataLoading) {
        return <DataLoadingSpinner />
    }

    return (
        <div>
            <ReportTable data={reports} updateState={updateState} setUpdateState={setUpdateState} />
        </div>
    )
}

export default Reports