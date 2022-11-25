import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth, updateProfile } from 'firebase/auth';
import app from '../../firebase/firebase.config';
import toast from 'react-hot-toast';
import { AuthContext } from '../../UserContext/UserContext';
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { ImCross } from 'react-icons/im'
import axios from 'axios';
import { PhotoView } from 'react-photo-view';
function Register() {
    const auth = getAuth(app);
    const { setUser, setLoading, loading } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/';
    const { register, handleSubmit, watch, formState: { errors }, resetField } = useForm();
    let previewImage = null;
    if (watch("photo")) {
        const image = watch("photo")[0];
        if (image) {
            previewImage = URL.createObjectURL(image);
        }
    }
    const userRole = (userData, role) => {
        const user = { ...userData, role: role }
        axios.post('http://localhost:5000/register', { user }).then((response) => console.log(response))
    }
    const jwtToken = (user, role) => {
        setLoading(true);
        const uid = user?.uid;
        fetch('http://localhost:5000/jwt', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ uid }),
        }).then(res => res.json()).then(data => {
            if (data.token) {
                localStorage.setItem('your-car-token', data.token)
                setLoading(false);
                setUser(user);
                userRole(user, role);
                toast.success('Successfully Login');
                navigate(from, { replace: true });
            }
            else {
                toast.error('Login Failed');
                setLoading(false);
            }
        }).catch(err => { console.log(err); setLoading(false); })
    }
    const handleFormSubmit = (e) => {
        setLoading(true); // new added , maybe needed to be removed
        if (!/^([a-zA-Z0-9\s_\\.\-:()])+(.jpg|.jpeg|.gif|.png|.bmp)$/.test(e.photo[0].name)) {
            window.alert('Invalid Image Type');
            return
        }
        const formData = new FormData;
        const email = e.email;
        const password = e.password;
        const role = e.role;
        formData.append('image', e.photo[0]);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_Imgbb_Key}`, {
            method: 'POST',
            body: formData
        }).then(res => res.json()).then(data => {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    updateProfile(auth.currentUser, {
                        displayName: e.username,
                        photoURL: data.data.display_url
                    }).then(() => {
                        auth.currentUser.photoURL = data.data.display_url;
                        setUser(auth.currentUser);
                        jwtToken(auth.currentUser, role)
                        navigate(from, { replace: true });
                        toast.success('Successfully registered');
                    }).catch((error) => {
                        console.log(error)
                        setLoading(false);
                    });
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    toast.error(errorMessage);
                    setLoading(false);
                });
        }).catch(error => {
            console.log(error)
            setLoading(false);
        });
    }

    if (loading) {
        setTimeout(() => {
            setLoading(false);
        }, 1500);
        return (
            <div className=" rounded relative mt-[100px]">
                <div className="rounded-full bg-[#b8ebf0] w-[190px] h-[190px] relative flex justify-center items-center mx-auto animate-spin">
                    <svg className="absolute top-[2px] right-0" width={76} height={97} viewBox="0 0 76 97" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="path-1-inside-1_2495_2146" fill="white">
                            <path d="M76 97C76 75.6829 69.2552 54.9123 56.7313 37.6621C44.2074 20.4118 26.5466 7.56643 6.27743 0.964994L0.0860505 19.9752C16.343 25.2698 30.5078 35.5725 40.5526 49.408C50.5974 63.2436 56.007 79.9026 56.007 97H76Z" />
                        </mask>
                        <path d="M76 97C76 75.6829 69.2552 54.9123 56.7313 37.6621C44.2074 20.4118 26.5466 7.56643 6.27743 0.964994L0.0860505 19.9752C16.343 25.2698 30.5078 35.5725 40.5526 49.408C50.5974 63.2436 56.007 79.9026 56.007 97H76Z" stroke="#1ab7c5" strokeWidth={40} mask="url(#path-1-inside-1_2495_2146)" />
                    </svg>
                    <div className="rounded-full bg-white w-[150px] h-[150px]" />
                </div>
                <p className="absolute mx-auto inset-x-0 my-auto inset-y-[80px] text-base font-medium text-gray-800 text-center">
                    Loading ...
                </p>
            </div>
        )
    }

    return (
        <div className='p-2 bg-transparent flex justify-center items-start pt-3 lg:pt-8 min-h-screen'>
            <Helmet>
                <title>Smile - Register</title>
            </Helmet>
            <div className="w-full h-fit max-w-md p-8 space-y-3 mb-5 text-slate-800 bg-transparent dark:text-gray-100  border shadow-lg dark:bg-gray-800 dark:border-none">
                <h1 className="text-2xl text-center font-thin">Registration Form</h1>
                <form className="space-y-6" onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="username" className="block dark:text-gray-400 text-slate-800">Username</label>
                        <input type="text" {...register("username", { required: "Name is required" })} placeholder="Username" className="w-full px-4 py-2  dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 text-slate-800 focus:dark:border-violet-400" />
                        {errors.username && <p className='text-red-600' >{errors.username?.message}</p>}
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="Email" className="block dark:text-gray-400 text-slate-800">Email</label>
                        <input type="email" {...register("email", { required: "Email is required" })} placeholder="Email" className="w-full px-4 py-2  dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 text-slate-800 focus:dark:border-violet-400" />
                        {errors.email && <p className='text-red-600' >{errors.email?.message}</p>}
                    </div>

                    <div className="space-y-1 text-sm">
                        <div className="flex flex-col items-center justify-center w-full">
                            {previewImage !== null && <div className='relative'>
                                <PhotoView src={previewImage}>
                                    <img src={previewImage} className='!w-[110px] !h-[100px]cursor-zoom-in border-2 p-1' aria-disabled alt="" />
                                </PhotoView>
                                <p className='absolute top-[-8px] right-[-15px] rounded-full px-1 text-red-600 cursor-pointer text-xl' onClick={() => { resetField('photo'); previewImage = null }}><ImCross /></p>
                            </div>}
                            {previewImage === null && <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-[120px] border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                    <p className="mb-2 text-sm dark:text-gray-400 text-slate-800"><span className="font-semibold">Click to upload user image</span></p>
                                    <p className="text-xs dark:text-gray-400 text-slate-800">SVG, PNG, JPG or GIF</p>
                                </div>
                                <input id="dropzone-file" type="file" accept='image/*' {...register("photo", { required: "Photo is required" })} className="hidden" />
                            </label>}
                            {errors.photo && <p className='text-red-600' >{errors.photo?.message}</p>}
                        </div>
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="role" className="block dark:text-gray-400 text-slate-800">Register for ?</label>
                        <select className="select-bordered w-full text-sm" {...register("role")}>
                            <option defaultChecked value='buyer'>Buyer</option>
                            <option value='seller'>Seller</option>
                        </select>
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block dark:text-gray-400 text-slate-800">Password</label>
                        <input type="password" {...register("password", { required: "Password is required" })} placeholder="Password" className="w-full px-4 py-2  dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 text-slate-800 focus:dark:border-violet-400" />
                        {errors.password && <p className='text-red-600' >{errors.password?.message}</p>}
                    </div>
                    <button className="block w-full p-3 text-center rounded-sm 
                    bg-amber-400
                    text-white bg-gradient-to-l" type='submit'>Sign up</button>
                </form>
                <p className="text-xs text-center sm:px-6 dark:text-gray-400 text-slate-800">Already have an account?
                    <Link rel="noopener noreferrer" to='/login' className="underline dark:text-gray-100 text-slate-800 px-2 text-sm font-bold">Log in</Link>
                </p>
            </div>
        </div>
    )
}

export default Register;