/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { GiChefToque, GiForkKnifeSpoon } from "react-icons/gi";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FiBook, FiHome, FiKey, FiLogOut, FiPhone, FiShoppingCart, FiStar, FiPackage } from 'react-icons/fi'
import { useCart } from '../../CartContext/CartContext';
import Login from '../Login/Login';
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const { totalItems } = useCart();
    const navigate = useNavigate();
    const location = useLocation();

    // COMBINING UPDATING LOGIN MODAL AND AUTH STATUS ON LOCATION CHANGE
    const [isAuthenticated, setIsAuthenticated] = useState(
        Boolean(localStorage.getItem('loginData'))
    )
    console.log(isAuthenticated)

    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('loginData');
        return storedUser ? JSON.parse(storedUser) : null;
    })
    console.log('user:', user);

    useEffect(() => {
        setShowLoginModal(location.pathname === '/login');
        setIsAuthenticated(Boolean(localStorage.getItem('loginData')))
    }, [location.pathname]);

    const handleLoginSuccess = (data) => {
        localStorage.setItem('loginData', JSON.stringify({
            ...data.user,
            token: data.token
        }));
        setUser(data.user); // <- update local state
        setIsAuthenticated(true);
        navigate('/');
    };

    const handleLogout = () => {
        localStorage.removeItem('loginData');
        setIsAuthenticated(false);
    }

    useEffect(() => {
        setShowLoginModal(location.pathname === '/login');
        const storedUser = localStorage.getItem('loginData');
        setIsAuthenticated(Boolean(storedUser));
        setUser(storedUser ? JSON.parse(storedUser) : null);
    }, [location.pathname]);

    // EXTRACT DESKTOP AUTH BUTTON
    const renderDesktopAuthButton = () => {
        return isAuthenticated ? (
            <button
                onClick={handleLogout}
                className='px-3 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-br from-amber-600 to-amber-700 text-[#2D1B0E] rounded-2xl font-bold hover:shadow-lg hover:shadow-amber-600/40 transition-all transform hover:scale-[1.02] border-2 border-amber-600/20 flex items-center space-x-2 shadow-md shadow-amber-900/20 text-sm'
            >
                <FiLogOut className='text-base lg:text-lg' />
                <span className='text-shadow'>Logout</span>
            </button>
        ) : (
            <button
                onClick={() => navigate('/login')}
                className='px-3 lg:px-4 py-1.5 lg:py-2 bg-gradient-to-br from-amber-600 to-amber-700 text-[#2D1B0E] rounded-2xl font-bold hover:shadow-lg hover:shadow-amber-600/40 transition-all transform hover:scale-[1.02] border-2 border-amber-600/20 flex items-center space-x-2 shadow-md shadow-amber-900/20 text-sm'
            >
                <FiKey className='text-base lg:text-lg' />
                <span className='text-shadow'>Login</span>
            </button>
        )
    }

    // EXTRACT MOBILE AUTH BTN
    const renderMobileAuthButton = () => {
        return isAuthenticated ? (
            <button 
                onClick={handleLogout}
                className='w-full px-4 py-3 bg-gradient-to-br from-amber-500 to-amber-700 text-[#2D1B0E] rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm'
            >
                <FiLogOut />
                <span>Logout</span>
            </button>
        ) : (
            <button 
                onClick={() => {
                    navigate('/login');
                    setIsOpen(false);
                }}
                className='w-full px-4 py-3 bg-gradient-to-br from-amber-500 to-amber-700 text-[#2D1B0E] rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm'
            >
                <FiLogOut />
                <span>Login</span>
            </button>
        )
    }

    const navLinks = [
        { name: 'Home', href: '/', icon: <FiHome /> },
        { name: 'Menu', href: '/menu', icon: <FiBook /> },
        { name: 'About', href: '/about', icon: <FiStar /> },
        { name: 'Contact', href: '/contact', icon: <FiPhone /> },
        ...(isAuthenticated && user?.isAdmin === false ? [
            { name: 'Orders', href: '/myorder', icon: <FiPackage />}
        ] : []),
        ...(isAuthenticated && user?.isAdmin ? [
            { name: 'Admin', href: '/admin-panel', icon: <FiKey /> }
        ] : [])
    ];

    // Motion variants for nav and overlay
    const overlayVariants = {
        hidden: { x: '-100%' },
        visible: { 
            x: 0,
            transition: { type: 'tween', duration: 0.5 }
        },
        exit: { x: '-100%', transition: { type: 'tween', duration: 0.5, delay: 0.4 } }, // delay to allow nav to exit first
    };

    const mobileNavVariants = {
        hidden: { x: '-100%' },
        visible: {
            x: 0,
            transition: { type: 'tween', duration: 0.5, delay: 0.4 }, // delay after overlay
        },
        exit: {
            x: '-100%',
            transition: { type: 'tween', duration: 0.5 },
        },
    };

    return (
        <nav className='bg-[#2D1B0E] border-b-8 border-amber-900/30 shadow-amber-900/30 sticky top-0 z-50 shadow-[0_25px_50px_-12px] font-vibes group/nav overflow-x-hidden'>
            <div className='absolute -top-3 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4'>
                <div className='h-[6px] bg-gradient-to-r from-transparent via-amber-600/50 to-transparent shadow-[0_0_20px] shadow-amber-500/30'>
                    <div className='flex justify-between px-6'>
                        <GiForkKnifeSpoon className='text-amber-500/40 -mt-4 -ml-2 rotate-45' size={32} />
                        <GiForkKnifeSpoon className='text-amber-500/40 -mt-4 -mr-2 -rotate-45' size={32} />
                    </div>
                </div>
            </div>

            {/* MAIN NAVIGATION CONTAINER */}
            <div className='max-w-7xl mx-auto px-4 relative'>
                <div className='flex justify-between items-center h-16 md:h-20 lg:h-24'>

                    {/* LOGO SECTION */}
                    <div className='flex-shrink-0 flex items-center space-x-2 group relative md:-translate-x-4 lg:-translate-x-6 ml-0 md:ml-2'>
                        <div className='absolute -inset-4 bg-amber-500/10 rounded-full blur-xl opacity-0 group-hover/nav:opacity-100 transition-opacity duration-300' />
                        <GiChefToque className='text-3xl md:text-4xl lg:text-5xl text-amber-500 transition-all group-hover:rotate-12 group-hover:text-amber-400 hover:drop-shadow-[0_0_15px] hover:drop-shadow-500/50' />
                        <div className='flex flex-col relative ml-2 max-w-[140px] md:max-w-[160px] lg:max-w-none'>
                            <NavLink
                                to='/'
                                className='text-2xl md:text-xl lg:text-4xl bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-monsieur tracking-wider drop-shadow-[0_2px_2px] drop-shadow-black truncate md:truncate-none'
                            >
                                Excellent Bistro
                            </NavLink>
                            <div className='h-[3px] rounded-3xl bg-gradient-to-r from-amber-600/30 via-amber-400/50 to-amber-600/30 w-full mt-1 shadow-[0_2px_5px] shadow-amber-500/20' />
                        </div>
                    </div>

                    {/* DESKTOP NAVIGATION */}
                    <div className='hidden md:flex items-center space-x-2 md:space-x-1 lg:space-x-4 flex-1 justify-end'>
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.href}
                                className={({ isActive }) => `group px-3 md:px-3 lg:px-4 py-2 md:py-2 lg:py-3 text-[15px] lg:text-base relative transition-all duration-300 flex items-center hover:bg-amber-900/20 rounded-3xl border-2 
                                    ${
                                        isActive 
                                            ? 'border-amber-600/50 bg-amber-900/20 shadow-[inset_0_0_15px] shadow-amber-500/20' 
                                            : 'border-amber-900/30 hover:border-amber-600/50'} shadow-md shadow-amber-900/20`
                                    }
                            >
                                <span className='mr-2 text-sm md:text-[15px] lg:text-base text-amber-500 group-hover:text-amber-300 transition-all'>
                                    { link.icon }
                                </span>
                                <span className='text-amber-100 group-hover:text-amber-300 relative'>
                                    { link.name }
                                    <span className='absolute -bottom-1 left-0 w-0 h-[2px] bg-amber-400 transition-all group-hover:w-full' />
                                </span>
                            </NavLink>
                        ))}

                        <div className='flex items-center space-x-2 md:space-x-3 lg:space-x-4 ml-3 md:ml-3 lg:ml-6 mr-2 md:mr-3 lg:mr-4'>
                            <NavLink
                                to='/cart'
                                className='p-2 md:p-2.0 lg:p-3 text-amber-100 rounded-xl transition-all relative border-2 border-amber-900/30 hover:border-amber-600/50 group hover:bg-amber-900/20 hover:shadow-lg hover:shadow-amber-500/30 shadow-md shadow-amber-900/20'
                            >
                                <FiShoppingCart className='text-base md:text-lg lg:text-lg' />
                                {totalItems > 0 && (
                                    <span className='absolute -top-2 -right-2 bg-amber-600 text-amber-100 text-xs w-5 h-5 rounded-full flex items-center justify-center'>
                                        {totalItems}
                                    </span>
                                )}
                            </NavLink>
                            {renderDesktopAuthButton()}
                        </div>
                    </div>

                    {/* MOBILE MENU */}
                    <div className='md:hidden flex items-center mr-2'>
                        <button
                            className='text-amber-500 hover:text-amber-300 focus:outline-none transition-all p-2 rounded-xl border-2 border-amber-900/30 hover:border-amber-600/50 relative shadow-md shadow-amber-900 hover:shadow-lg hover:shadow-amber-500/30'
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <div className='relative w-6 h-5'>
                                <span
                                    className={`absolute top-0 left-0 w-6 h-[2px] bg-current transition-transform duration-300 ease-in-out ${
                                        isOpen ? 'rotate-45 top-2.5' : ''
                                    }`}
                                />
                                <span
                                    className={`absolute top-2.5 left-0 w-6 h-[2px] bg-current transition-opacity duration-300 ${
                                        isOpen ? 'opacity-0' : 'opacity-100'
                                    }`}
                                />
                                <span
                                    className={`absolute bottom-0 left-0 w-6 h-[2px] bg-current transition-transform duration-300 ease-in-out ${
                                        isOpen ? '-rotate-45 bottom-2.5' : ''
                                    }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE NAVIGATION */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className='fixed inset-0 bg-black/20 z-40'
                            variants={overlayVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Mobile Sidebar */}
                        <motion.div
                            className='fixed top-0 left-0 h-full w-64 bg-[#2D1B0E]/20 backdrop-blur-xs z-50 shadow-lg shadow-black/30 px-6 py-8 space-y-6 overflow-y-auto'
                            variants={mobileNavVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* Close Button */}
                            <button
                                className='text-amber-400 hover:text-amber-200 text-lg'
                                onClick={() => setIsOpen(false)}
                            >
                                Close
                            </button>

                            {/* Nav Links */}
                            <nav className='space-y-4'>
                                {navLinks.map((link) => (
                                    <NavLink
                                        key={link.name}
                                        to={link.href}
                                        className='w-full px-4 py-3 bg-gradient-to-b from-amber-500 to-amber-700 rounded-xl font-semibold flex items-center justify-center space-x-2 text-sm text-amber-100 hover:text-amber-300'
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <span>{link.icon}</span>
                                        <span>{link.name}</span>
                                    </NavLink>
                                ))}
                            </nav>

                            {/* Cart & Auth */}
                            <div className='pt-6 space-y-4 border-t border-amber-900'>
                                <NavLink
                                    to='/cart'
                                    className='flex items-center space-x-3 text-amber-100 hover:text-amber-300'
                                    onClick={() => setIsOpen(false)}
                                >
                                    <FiShoppingCart />
                                    <span>Cart ({totalItems})</span>
                                </NavLink>

                                {renderMobileAuthButton()}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* LOGIN MODAL */}
            <AnimatePresence mode='wait'>
                {showLoginModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className='fixed inset-0 bg-[#2D1B0E]/20 backdrop-blur-xs flex items-center justify-center z-50 p-4'
                    >
                        <div className='bg-gradient-to-br fro-[#2D1B0E] to-[#4A372A] rounded-xl p-6 w-full max-w-[480px] relative shadow-[0_0_30px] shadow-amber-500/30'>
                            <button
                                onClick={() => navigate('/')}
                                className='absolute top-2 right-2 text-amber-500 hover:text-amber-300 text-2xl'
                            >
                                &times;
                            </button>
                            <h2 className='text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-4 text-center'>
                                Excellent-bistro
                            </h2>
                            <Login
                                onLoginSuccess={handleLoginSuccess} 
                                onClose={() => navigate('/')} 
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar