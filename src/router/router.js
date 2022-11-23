import { createBrowserRouter } from "react-router-dom";
import Blog from "../pages/Blog/Blog";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Logout from "../pages/Logout/Logout";
import Profile from "../pages/Profile/Profile";
import Register from "../pages/Register/Register";
import Search from "../pages/Search/Search";
import Layout from "../Layout/Layout";
import Errorpages from "../pages/ErrorPage/ErrorPage"
import DashBoardLayout from "../Layout/DashBoardLayout"
import ProtectedRoute from "./ProtectedRoute";
import Payment from "../pages/Payment/Payment";
export const router = createBrowserRouter([
    {
        path: '/', errorElement: <Errorpages />, element: <Layout />, children: [
            { path: '/', element: <Home /> },
            { path: '/login', element: <Login /> },
            { path: '/logout', element: <Logout /> },
            { path: '/register', element: <Register /> },
            { path: '/profile', element: <Profile /> },
            { path: '/blog', element: <Blog /> },
            { path: '/search', element: <Search /> },
        ]
    },
    {
        path: '/dashboard', errorElement: <Errorpages />, element: <DashBoardLayout />, children: [
            { path: '/dashboard', element: <p>Dashboard</p> },
            { path: '/dashboard/payment', element: <Payment/> },
        ]
    }
])