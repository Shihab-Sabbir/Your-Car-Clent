import React, { useState } from "react";
import logo from '../../asset/logo.png'
import { MdOutlineLightMode, MdOutlineDarkMode } from 'react-icons/md';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../UserContext/UserContext";
import { useContext } from "react";
import SearchModal from "../../component/SearchModal/SearchModal";
import { AiOutlineMenu } from 'react-icons/ai';
import './Header.css'
export default function Header() {
    let arr = [true, false, false, false, false, false]
    const [style, setStyle] = useState(arr);
    const [dropDown, setDropDown] = useState(true);
    const [text, setText] = useState("");
    const { dark, setDark, user, handleSearch } = useContext(AuthContext);
    const navigate = useNavigate();
    function handleDark() {
        localStorage.setItem('your-car-theme', JSON.stringify(!dark));
        setDark(!dark);
    }

    const selected = (props) => {
        let newArr = [...arr];
        for (let i = 0; i < newArr.length; i++) {
            newArr[i] = false;
        }
        newArr[props] = true;
        setStyle(newArr);
    }

    const setSelectedText = (txt) => {
        setText(txt);
        setDropDown(true);
    }

    return (
        <div className="2xl:container 2xl:mx-auto">
            <div className="bg-gray-100 dark:bg-gray-900 rounded py-2 px-4 lg:px-2">
                <nav className="flex justify-between">
                    <Link to='/' className="flex items-center space-x-3 lg:pr-16 pr-6">
                        <img src={logo} alt="" />
                    </Link>
                    <ul className="hidden md:flex flex-auto h-fit pt-4 space-x-2">
                        <Link to='/'>
                            <li onClick={() => selected(0)} className={`${style[0] ? 'text-white bg-amber-400' : 'text-gray-600 border border-white bg-gray-50'}  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800  cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded`}>Home</li>
                        </Link>
                        <Link to='/all-products'>
                            <li onClick={() => selected(1)} className={`${style[1] ? 'text-white bg-amber-400' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded`}>Products</li>
                        </Link>
                        <Link to='/dashboard'>
                            <li onClick={() => selected(2)} className={`${style[2] ? 'text-white bg-amber-400' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded`}>Dashboard</li>
                        </Link>
                        <Link to='/blog'>
                            <li onClick={() => selected(3)} className={`${style[3] ? 'text-white bg-amber-400' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded`}>Blog</li>
                        </Link>
                        {!user?.uid && <Link to='/login'>
                            <li onClick={() => selected(4)} className={`${style[4] ? 'text-white bg-amber-400' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded`}>Login</li>
                        </Link>}
                        {user?.uid && <Link to='/logout'>
                            <li onClick={() => selected(4)} className={`${style[4] ? 'text-white bg-amber-400' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded`}>Logout</li>
                        </Link>}
                        <Link to='/'>
                            <li onClick={() => selected(5)} className={`${style[5] ? 'text-white bg-amber-400' : 'text-gray-600 border border-white bg-gray-50'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 cursor-pointer px-3 py-2.5 font-normal text-xs leading-3 shadow-md rounded`}>Contact</li>
                        </Link>
                    </ul>
                    <div className=" flex space-x-5 justify-center items-center pl-2">
                        <label htmlFor="search-modal" >
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
                                    stroke="#fbbf24"
                                    strokeWidth="2.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M21 21L15 15"
                                    stroke="#fbbf24"
                                    strokeWidth="2.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </label>
                        <div className='border-2 rounded-md p-1 border-black dark:border-white'>
                            {dark ? <MdOutlineDarkMode className='text-xl text-white  cursor-pointer' title='click to light mode' onClick={handleDark} /> : <MdOutlineLightMode className='text-xl cursor-pointer text-black' title='click to light mode' onClick={handleDark} />}
                        </div>
                    </div>
                </nav>
                {/* for smaller devcies */}
                <div className="block md:hidden w-full mt-5 ">
                    <div onClick={() => setDropDown(!dropDown)} className="cursor-pointer px-4 py-3 text-white bg-amber-400 rounded flex justify-between items-center w-full">
                        <div className="flex space-x-2">
                            <span id="s1" className={`${text.length != 0 ? '' : 'hidden'} font-semibold text-sm leading-3`}></span><p id="textClicked" className="font-normal text-sm leading-3 focus:outline-none hover:bg-gray-800 duration-100 cursor-pointer ">{text ? text : "Menu"}</p>
                        </div>
                        <AiOutlineMenu />
                    </div>
                    <div className=" relative z-50">
                        <ul id="list" className={`${dropDown ? 'hidden' : 'block'} font-normal text-base leading-4 absolute top-2  w-full rounded shadow-md`}>
                            <Link to='/'>
                                <li onClick={() => setSelectedText("Home")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Home</li>
                            </Link>
                            <Link to='/all-products'>
                                <li onClick={() => setSelectedText("Products")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Products</li>
                            </Link>
                            <Link to='/dashboard'>
                                <li onClick={() => setSelectedText("Dashboard")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Dashboard</li>
                            </Link>
                            <Link to='/blog'>
                                <li onClick={() => setSelectedText("Blog")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Blog</li>
                            </Link>
                            <Link to='/contact'>
                                <li onClick={() => setSelectedText("Contact")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Contact</li>
                            </Link>
                            {!user?.uid && <Link to='/login'>
                                <li onClick={() => setSelectedText("Utility")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Login</li>
                            </Link>}
                            {user?.uid && <Link to='/logout'>
                                <li onClick={() => setSelectedText("Utility")} className="px-4 py-3 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-200 border-gray-50 focus:outline-none focus:bg-gray-100 hover:bg-gray-100 duration-100 cursor-pointer text-xs leading-3 font-normal">Logout</li>
                            </Link>}
                        </ul>
                    </div>
                </div>
            </div>
            <input type="checkbox" id="search-modal" className="modal-toggle" />
            <SearchModal handleSearch={handleSearch} />
        </div>

    );
}
