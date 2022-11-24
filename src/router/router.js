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
import AddProduct from "../pages/Seller/AddProduct";
import MyProduct from "../pages/Seller/MyProduct";
import AllSellers from "../pages/admin/AllSellers";
import AllBuyers from "../pages/admin/AllBuyers";
import ProductsEachCategory from "../pages/ProductsEachCategory/ProductsEachCategory";
import MyOrders from "../pages/Buyer/MyOrders";
import Wishlist from "../pages/Buyer/Wishlist";
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
            { path: '/product', element: <ProductsEachCategory /> },
        ]
    },
    {
        path: '/dashboard', errorElement: <Errorpages />, element: <DashBoardLayout />, children: [
            { path: '/dashboard', element: <p>Dashboard</p> },
            { path: '/dashboard/payment', element: <Payment /> },
            { path: '/dashboard/add-product', element: <AddProduct /> },
            { path: '/dashboard/my-products', element: <MyProduct /> },
            { path: '/dashboard/my-wishlist', element: <Wishlist /> },
            { path: '/dashboard/my-orders', element: <MyOrders /> },
            { path: '/dashboard/all-sellers', element: <AllSellers /> },
            { path: '/dashboard/all-buyers', element: <AllBuyers /> },
        ]
    }
])