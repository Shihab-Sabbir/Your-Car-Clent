import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import logoutAmin from '../../asset/logout.gif'
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { logOut } from '../../Utility/logout';
function Logout() {
    const { user, setUser, setDbUser } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div>
            <div className='flex flex-col justify-center items-center bg-transparent'>
                <Helmet>
                    <title>Your Car - Logout</title>
                </Helmet>
                <img src={logoutAmin} className='w-[220px]' alt="" />
                <div>
                    <button type="button" className="uppercase text-xs font-bold shadow-lg p-2 px-4 rounded-md bg-amber-400 text-white " onClick={() => logOut(user, setUser, navigate, setDbUser)}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Logout;