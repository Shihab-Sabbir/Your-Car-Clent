import React, { useContext } from 'react'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { Navbar, Dropdown, Avatar } from 'flowbite-react';
import { AuthContext } from '../../UserContext/UserContext';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from '../../asset/logo.png'
import userFakeImg from '../../asset/images/userImgPlaceHolder.png'
import './Header.css'
function Header() {
    const { dark, setDark, user, handleSearch } = useContext(AuthContext);
    const navigate = useNavigate();
    function handleDark() {
        localStorage.setItem('your-car-theme', JSON.stringify(!dark));
        setDark(!dark);
    }
    return (
        <div className='max-w-[1530px] mx-auto'>
            <Navbar
                fluid={true}
                rounded={false}
                className='smileNav'>
                <Navbar.Brand>
                    <Link to='/'>
                        <img
                            src={logo}
                            className="mx-3 h-14 cursor-pointer"
                            alt="Flowbite Logo"
                        />
                    </Link>
                </Navbar.Brand>
                <div className="flex gap-1 xl:gap-4 items-center md:order-2 lg:mt-0 mt-0 md:mt-2">
                    {user?.uid != null && <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar alt="User settings" img={user?.photoURL || userFakeImg} rounded={true} />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {user?.displayName}
                            </span>
                            <span className="block truncate text-sm font-medium">
                                {user?.email}
                            </span>
                        </Dropdown.Header>
                        <Link to='/profile'>
                            <Dropdown.Item>
                                Profile
                            </Dropdown.Item>
                        </Link>
                        <Link to='/login'>
                            <Dropdown.Item>
                                {user?.uid ? "Logout" : "Login"}
                            </Dropdown.Item>
                        </Link>
                    </Dropdown>}
                    <div className='border-2 p-1 rounded-md hidden sm:block'>
                        {dark ? <MdOutlineDarkMode className='text-xl text-white  cursor-pointer' title='click to light mode' onClick={handleDark} /> : <MdOutlineLightMode className='text-xl cursor-pointer' title='click to light mode' onClick={handleDark} />}
                    </div>
                    <Navbar.Toggle />
                </div>
                <Navbar.Collapse className='x'>
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/blog"
                        end
                        className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class")}
                    >
                        Blog
                    </NavLink>
                    <NavLink
                        to="/login"
                        end
                        className={({ isActive }) => (isActive ? "active-class" : "non-active-class dark:non-active-class ")}
                    >
                        {user?.uid ? "Logout" : "Login"}
                    </NavLink>
                    <div className='p-2 max-w-[500px] mx-auto hidden lg:block '>
                        <form action='' className="flex justify-start items-center relative" onSubmit={(e) => { handleSearch(e); navigate('/search'); }}>
                            <input type="text" name="search" id="" className="text-sm leading-none text-left text-gray-600 px-4 py-3 w-full border rounded border-gray-300  outline-none" placeholder='Search Service...' required />
                            <button type='submit' className='flex justify-center items-center'>
                                <svg

                                    className="absolute right-3 z-10 cursor-pointer"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                                        stroke="#4B5563"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M21 21L15 15"
                                        stroke="#4B5563"
                                        strokeWidth="1.66667"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                    <div className='lg:hidden'>
                        <label htmlFor="my-modal" >
                            <svg

                                className="z-10 cursor-pointer lg:ml-[100px]"
                                width={24}
                                height={24}
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                                    stroke="#00ACBD"
                                    strokeWidth="2.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M21 21L15 15"
                                    stroke="#00ACBD"
                                    strokeWidth="2.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </label>
                        <input type="checkbox" id="my-modal" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <div>
                                    <form action='' className=" flex justify-start items-center relative" onSubmit={(e) => { handleSearch(e); navigate('/search'); }}>
                                        <input type="text" name="search" id="" className="text-sm leading-none text-left text-gray-600 px-4 py-3 w-full border rounded border-gray-300  outline-none" placeholder='Search Service...' required />
                                        <button type='submit' className='flex justify-center items-center'>
                                            <svg

                                                className="absolute right-3 z-10 cursor-pointer"
                                                width={24}
                                                height={24}
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z"
                                                    stroke="#4B5563"
                                                    strokeWidth="1.66667"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                                <path
                                                    d="M21 21L15 15"
                                                    stroke="#4B5563"
                                                    strokeWidth="1.66667"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </button>
                                    </form>
                                </div>
                                <label htmlFor="my-modal" className="btn mt-5">Cancle</label>
                            </div>
                        </div>
                    </div>
                    <Navbar.Link>
                        <div className='absolute top-[69px] right-[12px] sm:hidden border-2 p-1 rounded-md'>
                            {dark ? <MdOutlineDarkMode className='text-xl cursor-pointer' title='click to light mode' onClick={handleDark} /> : <MdOutlineLightMode className='text-xl cursor-pointer' title='click to light mode' onClick={handleDark} />}
                        </div>
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>

        </div>
    )
}

export default Header;