import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../UserContext/UserContext';
function DashboardSidebar({ toggle }) {
    const [dbUser, setDbUser] = useState({});
    const { dark, setDark, user } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`http://localhost:5000/user/${user?.uid}`)
            .then(res => res.json())
            .then(data => setDbUser(data))
            .catch(err => console.log(err))
    }, [user])

    function handleDark() {
        localStorage.setItem('smile-theme', JSON.stringify(!dark));
        setDark(!dark);
    }

    return (
        <div className={`w-64 z-50 border-r dark:border-none shadow-xl dark:shadow dark:shadow-indigo-600 md:ml-0  md:block bg-white  dark:bg-gray-900 dark:text-gray-100 min-h-screen fixed  ${toggle ? 'duration-700  ml-0' : 'duration-700 -ml-64'}`}>
            <aside className="w-full  sm:w-60 ">
                <div className='flex items-center justify-between'>
                    <div className="flex cursor-pointer items-center gap-1 text-sm font-semibold tracking-widest uppercase text-black dark:text-gray-400 px-6 pt-1" onClick={() => navigate('/')}> <IoArrowBackSharp /> Home </div>
                    <div className='border-2 border-gray-500 mx-4 mt-2 rounded-md'>
                        {dark ? <MdOutlineDarkMode className='text-xl text-white  cursor-pointer' title='click to light mode' onClick={handleDark} /> : <MdOutlineLightMode className='text-xl cursor-pointer text-black' title='click to light mode' onClick={handleDark} />}
                    </div>
                </div>
                <nav className="space-y-8 p-6 text-sm">
                    <div className="space-y-2 text-center">
                        <img alt="" className="w-12 h-12 rounded-md mx-auto ring-2 ring-offset-1 dark:bg-gray-500 ring-primary ring-offset-gray-800" src={user?.photoURL} />
                        <p className='text-sm font-semibold tracking-widest uppercase text-black dark:text-gray-400'>{user?.displayName}
                        </p>
                        <p className='text-black dark:text-gray-400'>{user?.email}</p>
                        <p className='text-xs font-semibold tracking-widest uppercase text-black dark:text-gray-400'>
                            Athority : {dbUser?.role}
                        </p>
                    </div>
                    <hr />
                    {dbUser?.role === 'admin' && <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase text-black dark:text-gray-400">Admin Menu</h2>
                        <div className="flex flex-col space-y-1">
                            <NavLink to="/dashboard/users"
                                end
                                className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>Users</NavLink>
                            <NavLink to="/dashboard/appointment"
                                end
                                className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>Appointments</NavLink>
                            <NavLink to="/dashboard/add-doctor"
                                end
                                className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>Add Doctor</NavLink>
                        </div>
                    </div>}
                    {dbUser?.role === 'buyer' && <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase text-black dark:text-gray-400">User Menu</h2>
                        <div className="flex flex-col space-y-1">
                            <NavLink to="/dashboard/my-appointment"
                                end
                                className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>My Appointments</NavLink>
                            <NavLink to="/dashboard/req-admin"
                                end
                                className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>Request Admin</NavLink>
                        </div>
                    </div>}
                    {dbUser?.role === 'seller' && <div className="space-y-2">
                        <h2 className="text-sm font-semibold tracking-widest uppercase text-black dark:text-gray-400">User Menu</h2>
                        <div className="flex flex-col space-y-1">
                            <NavLink to={`/dashboard/my-products/${user?.uid}`}
                                end
                                className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>My Products</NavLink>
                            <NavLink to="/dashboard/add-product"
                                end
                                className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>Add Product</NavLink>
                        </div>
                    </div>}
                </nav>
            </aside>
        </div>
    )
}

export default DashboardSidebar;



