import React from 'react'
import { Navigate } from 'react-router-dom'

const AdminRoute = ({ children }) => {
    const storedUser = localStorage.getItem('loginData');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const isAdmin = user?.isAdmin;

    return isAdmin ? children : <Navigate to='/' replace />;
}

export default AdminRoute;