import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { IoArrowBackSharp } from 'react-icons/io5';
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import Logout from '../../pages/Logout/Logout';
import { AuthContext } from '../../UserContext/UserContext';
function DashboardSidebar({ toggle }) {
    const { dark, setDark, user, dbUser, setDbUser } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        fetch(`https://your-car-server.vercel.app/user/${user?.uid}`)
            .then(res => res.json())
            .then(data => {
                setDbUser(data)
            })
            .catch(err => { console.log(err) })
    }, [user])

    function handleDark() {
        localStorage.setItem('your-car-theme', JSON.stringify(!dark));
        setDark(!dark);
    }

    return (
        <div className={`w-64 z-50 border-r dark:border-none shadow-xl dark:shadow dark:shadow-indigo-600 md:ml-0  md:block bg-white  dark:bg-gray-900 dark:text-gray-100 min-h-screen fixed  ${toggle ? 'duration-700  ml-0' : 'duration-700 -ml-64'}`}>
            <aside className="w-full  sm:w-60 ">
                <div className='flex items-center justify-between'>
                    <div className="flex cursor-pointer items-center gap-1 text-sm font-semibold tracking-widest uppercase text-amber-400 px-6 pt-1" onClick={() => navigate('/')}> <IoArrowBackSharp /> Home </div>
                    <div className='border-2 border-gray-500 mx-4 mt-2 rounded-md'>
                        {dark ? <MdOutlineDarkMode className='text-xl text-white  cursor-pointer' title='click to light mode' onClick={handleDark} /> : <MdOutlineLightMode className='text-xl cursor-pointer text-black' title='click to light mode' onClick={handleDark} />}
                    </div>
                </div>
                <nav className="space-y-8 p-6 text-sm flex flex-col justify-between items-center">
                    <div className='flex justify-center'>
                        {dbUser?.role === 'admin' && <div className="space-y-5">
                            <h2 className="text-sm font-semibold tracking-widest uppercase text-black dark:text-gray-400">Admin Menu</h2>
                            <div className="flex flex-col space-y-4 justify-center items-center">
                                <NavLink to="/dashboard/all-buyers"
                                    end
                                    className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>All Buyers</NavLink>
                                <NavLink to="/dashboard/all-sellers"
                                    end
                                    className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>All Sellers</NavLink>
                                <NavLink to="/logout"
                                    end
                                    className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>Logout</NavLink>
                            </div>
                        </div>}
                        {dbUser?.role === 'buyer' && <div className="space-y-5">
                            <h2 className="text-sm font-semibold tracking-widest uppercase text-black dark:text-gray-400 text-center">Buyer Menu</h2>
                            <div className="flex flex-col space-y-4 justify-center items-center">
                                <NavLink to="/dashboard/my-orders"
                                    end
                                    className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>My Orders</NavLink>
                                <NavLink to="/dashboard/my-wishlist"
                                    end
                                    className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>Wishlist</NavLink>
                                <NavLink to="/logout"
                                    end
                                    className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>Logout</NavLink>
                            </div>
                        </div>}
                        {dbUser?.role === 'seller' && <div className="space-y-5">
                            <h2 className="text-sm font-semibold tracking-widest uppercase text-black dark:text-gray-400">User Menu</h2>
                            <div className="flex flex-col space-y-4 justify-center items-center">
                                <NavLink to={`/dashboard/my-products`}
                                    end
                                    className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>My Products</NavLink>
                                <NavLink to="/dashboard/add-product"
                                    end
                                    className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>Add Product</NavLink>
                                <NavLink to="/logout"
                                    end
                                    className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}>Logout</NavLink>
                            </div>
                        </div>}
                    </div>
                    <div className="space-y-2 text-center absolute bottom-8 flex items-center gap-4 border-t pt-4 border-amber-500">
                        <img alt="" className="w-12 h-12 rounded-md mx-auto ring-2 ring-offset-1 dark:bg-gray-500 ring-primary ring-offset-amber-500 mt-[10px]" src={user?.photoURL} />
                        <div className='flex flex-col items-start'>
                            <p className='text-sm font-semibold tracking-widest uppercase text-black dark:text-gray-400'>{user?.displayName}
                            </p>
                            <p className='text-black dark:text-gray-400'>{user?.email}</p>
                            <p className='text-xs font-semibold tracking-widest uppercase text-black dark:text-gray-400'>
                                Athority : {dbUser?.role}
                            </p>
                        </div>
                    </div>
                </nav>
            </aside>
        </div>
    )
}

export default DashboardSidebar;



