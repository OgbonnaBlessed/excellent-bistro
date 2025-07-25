import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoutes = () => {
    const isAuthenticated = Boolean(localStorage.getItem('loginData'));
    return isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />;
}

export default PrivateRoutes;