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
import DashboardWellcome from "../pages/DashboardWellcome/DashboardWellcome";
import AdminRoute from "./AdminRoute";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import Allproducts from "../pages/Allproducts/Allproducts";
import Reports from "../pages/admin/Reports";
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
            { path: '/all-products', element: <Allproducts /> },
            { path: '/category/:id', element: <ProtectedRoute><ProductsEachCategory /></ProtectedRoute> },
            { path: '/product-details/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        ]
    },
    {
        path: '/dashboard', errorElement: <Errorpages />, element: <ProtectedRoute><DashBoardLayout /></ProtectedRoute>, children: [
            { path: '/dashboard', element: <DashboardWellcome /> },
            { path: '/dashboard/payment', element: <Payment /> },
            { path: '/dashboard/add-product', element: <AddProduct /> },
            { path: '/dashboard/my-products', element: <MyProduct /> },
            { path: '/dashboard/my-wishlist', element: <Wishlist /> },
            { path: '/dashboard/my-orders', element: <MyOrders /> },
            { path: '/dashboard/all-sellers', element: <AdminRoute><AllSellers /></AdminRoute> },
            { path: '/dashboard/all-buyers', element: <AdminRoute><AllBuyers /></AdminRoute> },
            { path: '/dashboard/reports', element: <AdminRoute><Reports /></AdminRoute> },
        ]
    }
])