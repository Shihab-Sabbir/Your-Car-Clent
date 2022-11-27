import React, { useState } from "react";
import userFakeImg from '../../asset/images/userImgPlaceHolder.png'
const Review = ({ review }) => {
    const [menu, setMenu] = useState(true);
    const { Reviewtitle, comment, userName, userEmail, userImg, time } = review;
    const date = new Date(time);
    const dateFormat = date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();
    return (
        <div className="py-4 px-4 md:px-6 2xl:px-0 2xl:container 2xl:mx-auto flex justify-center items-center">
            <div className="w-full flex justify-start items-start flex-col bg-transparent border border-amber-400 p-8 lg:w-[1040px] mx-auto">
                <div className="flex flex-col md:flex-row justify-between w-full">
                    <div className="flex flex-row justify-between items-start">
                        <p className="text-xl md:text-2xl font-medium leading-normal text-gray-800 dark:text-gray-300">{Reviewtitle}</p>
                        <button onClick={() => setMenu(!menu)} className="ml-4 md:hidden">
                            <svg className={"transform " + (menu ? "rotate-180" : "rotate-0")} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 12.5L10 7.5L5 12.5" stroke="#1F2937" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className={"md:block " + (menu ? "block" : "hidden")}>
                    <p className="mt-3 text-base leading-normal text-gray-600 w-full md:w-9/12 xl:w-5/6 dark:text-gray-300">{comment}</p>
                    <div className="mt-6 flex justify-start items-center flex-row space-x-2.5">
                        <div>
                            <img className="rounded-full w-[96px]" src={userImg || userFakeImg} alt="" />
                        </div>
                        <div className="flex flex-col justify-start items-start space-y-2 ">
                            <p className="text-base font-medium leading-none text-gray-800 dark:text-gray-300">{userName}</p>
                            <p className="text-base font-medium leading-none text-gray-800 dark:text-gray-300">{userEmail || "No Email Found"}</p>
                            <p className="text-sm leading-none text-gray-600 dark:text-gray-300">{dateFormat}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;
