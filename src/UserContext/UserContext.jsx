import React, { createContext, useEffect } from 'react'
import { useState } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../firebase/firebase.config';
import { Helmet } from "react-helmet";
import { Navigate, useNavigate } from 'react-router-dom';
export const AuthContext = createContext();
function UserContext({ children }) {
    const [dark, setDark] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [updateState, setUpdateState] = useState(false);
    const [dbUser, setDbUser] = useState({});
    const [search, setSearch] = useState('');
    const auth = getAuth(app);
    const userinfo = { dark, setDark, user, setUser, loading, setLoading, updateState, setUpdateState, handleSearch, search, auth, dbUser, setDbUser };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, [])

    useEffect(() => {
        fetch(`https://your-car-server.vercel.app/user/${user?.uid}`)
            .then(res => res.json())
            .then(data => {
                setDbUser(data)
            })
            .catch(err => { console.log(err) })
    }, [user])
    function handleSearch(e) {
        e.preventDefault();
        setSearch(e.target.search.value);
        setUpdateState(!updateState)
    }

    return (
        <AuthContext.Provider value={userinfo}>
            <Helmet>
                <title>Your Car</title>
            </Helmet>
            {children}
        </AuthContext.Provider>
    )
}

export default UserContext;