import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import car from '../../asset/images/dbimage.gif'
import { AuthContext } from '../../UserContext/UserContext';
function DashboardWellcome() {
    const { dbUser, setDbUser, user } = useContext(AuthContext);
    useEffect(() => {
        fetch(`https://your-car-server.vercel.app/user/${user?.uid}`)
            .then(res => res.json())
            .then(data => {
                setDbUser(data)
            })
            .catch(err => { console.log(err) })
    }, [user])
    return (
        <div className='flex flex-col items-center justify-center'>
            <Helmet>
                <title>Your Car - Dashboard</title>
            </Helmet>
            <p className='pt-[150px] text-center text-3xl font-extrabold text-black dark:text-slate-200'>Wellcome <span className='text-amber-400 capitalize'>{dbUser.displayName}</span></p>
            <img src={car} className='lg:w-[600px]' />
        </div>

    )
}

export default DashboardWellcome;