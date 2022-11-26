import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/Footer/Footer';
import Header from '../pages/Header/Header';

function Layout() {
    return (
        <div>
            <div className='min-h-screen bg-gray-100 dark:bg-[#0f172a]' >
                <Header />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Layout;