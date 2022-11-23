import React from 'react'
import { Outlet } from 'react-router-dom'
import DashboardSidebar from '../component/DashboardSidebar/DashboardSidebar';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
function DashBoardLayout() {
    const [toggle, setToggle] = useState(false);
    const handleToggle = () => {
        setToggle(!toggle);
    }
    return (
        <div className='flex'>
            <div>
                <DashboardSidebar toggle={toggle} />
            </div>
            <div className={`w-full pt-2 min-h-screen md:ml-64 bg-gray-100 dark:bg-[#0f172a]`}>
                <div className='flex justify-end md:hidden'>
                    <div className='mx-4 rounded-md flex justify-center items-center'>
                        <AiOutlineMenu className='text-xl text-black dark:text-white cursor-pointer' title='click to open menu' onClick={handleToggle} />
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default DashBoardLayout;