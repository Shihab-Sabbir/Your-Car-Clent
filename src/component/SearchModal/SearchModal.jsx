import React from 'react'
import { useNavigate } from 'react-router-dom';

function SearchModal({ handleSearch}) {
    const navigate = useNavigate();
    return (
        <div className="modal">
            <div className="modal-box bg-amber-200 p-4">
                <form className="flex !justify-start min-w-full items-center py-1 relative" onSubmit={(e) => { handleSearch(e); navigate('/search')}}>
                    <input
                        className="text-sm leading-none text-left text-gray-600 px-4 py-3 min-w-full border rounded border-gray-300 outline-none"
                        type="text"
                        name="search"
                        placeholder="Search"
                        required
                    />
                    <button type='submit' className="absolute right-3 top-6 z-10 cursor-pointer" >
                        <svg

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
                <label htmlFor="search-modal" className="btn bg-gray-500 border-0 text-white btn-sm mt-1">Cancle</label>
            </div>
        </div>
    )
}

export default SearchModal;