import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../UserContext/UserContext';
import loadingImg from '../asset/loading.gif'
import toast from 'react-hot-toast';
import DataLoadingSpinner from '../component/DataLoadingSpinner/DataLoadingSpinner';

function AdminRoute({ children }) {
    const { setLoading, user, loading, dbUser } = useContext(AuthContext);
    const location = useLocation();
    if (loading || !dbUser.role) {
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        return (
            <DataLoadingSpinner />
        )
    }
    if (dbUser.role === 'admin') {
        return children;
    }
    if (dbUser.role !== 'admin') {
        toast.error('Unathorized Access !');
        return <Navigate to='/' state={{ from: location }
        } replace />
    }
}

export default AdminRoute;