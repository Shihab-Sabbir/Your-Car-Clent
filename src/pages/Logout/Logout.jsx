import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import { getAuth, signOut } from "firebase/auth";
import app from '../../firebase/firebase.config';
import logoutAmin from '../../asset/logout.gif'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";
function Logout() {
    const auth = getAuth(app);
    const { user, setUser, dark } = useContext(AuthContext);
    const navigate = useNavigate();
    const logOut = () => {
        signOut(auth).then(() => {
            if (user?.uid) {
                setUser(null);
                toast.success('Logout Successful');
                localStorage.removeItem('your-car-token')
                navigate('/login');
            }
            else {
                toast.error('No user Logged in !')
            }
        }).catch((error) => {
            console.log(error)
        });
    }

    return (
        <div>
            <div className='flex flex-col justify-center items-center bg-transparent'>
                <Helmet>
                    <title>Smile - Logout</title>
                </Helmet>
                <img src={logoutAmin} className='w-1/2' alt="" />
                <div>
                    <button type="button" className="uppercase text-xs font-bold shadow-lg p-2 px-4 rounded-md bg-amber-400 text-white " onClick={logOut}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Logout;