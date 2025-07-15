import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const AdminRoutes = () => {
    const storedUser = localStorage.getItem('loginData');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const isAdmin = user?.isAdmin;

    return isAdmin ? <Outlet /> : <Navigate to='/' replace />;
}

export default AdminRoutes;