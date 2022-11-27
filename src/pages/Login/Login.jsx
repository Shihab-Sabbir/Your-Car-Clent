import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import app from '../../firebase/firebase.config';
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { AuthContext } from '../../UserContext/UserContext';
import { useRef } from 'react';
import Logout from '../Logout/Logout';
import { Helmet } from "react-helmet";
import axios from 'axios';
import DataLoadingSpinner from '../../component/DataLoadingSpinner/DataLoadingSpinner';
import { logOut } from '../../Utility/logout';
function Login() {
    const { setUser, setLoading, dark, user, loading } = useContext(AuthContext);
    const navigate = useNavigate();
    const auth = getAuth(app);
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const GoogleProvider = new GoogleAuthProvider();
    const userEmail = useRef();
    window.scrollTo(0, 0)
    const userRole = (userData) => {
        const user = { ...userData, role: 'buyer' }
        axios.post('https://your-car-server.vercel.app/register', { user }).then((response) => console.log(response))
    }
    if (user?.uid) {
        return navigate('/logout')
    }
    const jwtToken = (user) => {
        setLoading(true)
        const uid = user?.uid;
        fetch('https://your-car-server.vercel.app/jwt', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ uid }),
        }).then(res => {
            if (res.status == 403) {
                toast.error('Due to violation of terms and condition , your id is blocked !');
                logOut(user, setUser, navigate)
            }
            else { return res.json() }
        }).then(data => {
            if (data.token) {
                localStorage.setItem('your-car-token', data.token)
                setUser(user);
                userRole(user);
                setLoading(false);
                toast.success('Successfully Login');
                navigate(from, { replace: true });
            }
            else {
                toast.error('Login Failed');
                setLoading(false);
            }
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        setLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                jwtToken(user);
            })
            .catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage);
            });
    }
    function handleThirdPartyLogin(provider) {
        setLoading(true);
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                jwtToken(user)
            }).catch((error) => {
                const errorMessage = error.message;
                toast.error(errorMessage)
            });
    }
    function handlePasswordReset() {
        if (userEmail.current.value)
            sendPasswordResetEmail(auth, userEmail.current.value)
                .then(() => {
                    toast.success('Password reset mail has been sent to your Email, please check inbox or spam folder');
                })
                .catch((error) => {
                    const errorMessage = error.message;
                    toast.error(errorMessage)
                });
        else {
            toast.error('Please put your valid email address')
        }
    }

    if (loading) {
        setTimeout(() => {
            setLoading(false);
        }, 3500);
        return (
            <DataLoadingSpinner />
        )
    }


    return (
        <div className='flex justify-center p-2 items-start pt-3 lg:pt-8 md:min-h-screen bg-transparent'>
            <div className='flex lg:flex-row w-full flex-col items-center justify-evenly gap-10'>
                <Helmet>
                    <title>Your Car - Login</title>
                </Helmet>
                <div className="w-full h-fit max-w-md p-8 space-y-3  bg-gradient-to-r dark:bg-gray-800 bg-transparent dark:text-gray-100 border dark:border-none shadow-lg dark:shadow-xl">
                    <p tabIndex={0} role="heading" aria-label="Login to your account" className="text-2xl font-extrabold leading-6 text-gray-800 dark:text-gray-200 text-center">
                        Login to your account
                    </p>
                    <form noValidate={false} action="" className="space-y-6 ng-untouched ng-pristine ng-valid" onSubmit={handleFormSubmit}>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="Email" className="block dark:text-gray-400">Email</label>
                            <input required ref={userEmail} type="email" name="email" id="Email" placeholder="Email" className="w-full px-4 py-3  dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 text-slate-800 focus:dark:border-violet-400" />
                        </div>
                        <div className="space-y-1 text-sm">
                            <label htmlFor="password" className="block dark:text-gray-400">Password</label>
                            <input required type="password" name="password" id="password" placeholder="Password" className="w-full px-4 py-3 text-slate-800  dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 focus:dark:border-violet-400" />
                            <div className="flex justify-end text-xs dark:text-gray-400">
                                <button rel="noopener noreferrer" onClick={handlePasswordReset}>Forgot Password?</button>
                            </div>
                        </div>
                        <button className="block w-full p-3 text-center rounded-sm 
                    bg-amber-400 text-white bg-gradient-to-l">Sign in</button>
                    </form>
                    <div className="flex items-center pt-4 space-x-1">
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                        <p className="px-3 text-sm dark:text-gray-400">Login with social accounts</p>
                        <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
                    </div>
                    <div className="flex justify-center space-x-4">
                        <button aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10 place-content-center" onClick={() => { handleThirdPartyLogin(GoogleProvider) }}>
                            <svg width={19} height={20} viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z" fill="#4285F4" />
                                <path d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z" fill="#34A853" />
                                <path d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z" fill="#FBBC05" />
                                <path d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z" fill="#EB4335" />
                            </svg>
                            <p className="text-base font-medium ml-4 text-gray-700 dark:text-gray-200">Continue with Google</p>
                        </button>
                    </div>
                    <p className="text-xs text-center sm:px-6 dark:text-gray-400">Don't have an account?
                        <Link rel="noopener noreferrer" to='/register' className="underline text-slate-700 dark:text-slate-300  px-2 text-sm font-bold" type='submit'>Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login;