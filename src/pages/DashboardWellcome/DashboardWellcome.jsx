import React from 'react'
import { useContext } from 'react';
import car from '../../asset/images/dbimage.gif'
import { AuthContext } from '../../UserContext/UserContext';
function DashboardWellcome() {
    const { dbUser } = useContext(AuthContext);
    return (
            <div className='flex fle-col items-center justify-center'>
            <p className='pt-[150px] text-center text-3xl font-extrabold text-black dark:text-slate-200'>Wellcome <span className='text-amber-400'>{dbUser.displayName}</span></p>
                <img src={car} className='lg:w-[600px]' />
            </div>
       
    )
}

export default DashboardWellcome;