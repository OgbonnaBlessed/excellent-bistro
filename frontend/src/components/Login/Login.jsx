import { useEffect, useState } from 'react'
import { FaArrowRight, FaCheckCircle, FaEye, FaEyeSlash, FaLock, FaUser, FaUserPlus } from 'react-icons/fa';
import { iconClass, inputBase } from '../../assets/dummydata';
import { Link } from 'react-router-dom'
import axios from 'axios'
import {Checkbox} from "@heroui/react";
import { toast } from 'sonner';

const API_URL = import.meta.env.VITE_API_URL

const Login = ({ onLoginSuccess, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', rememberMe: '' });

    useEffect(() => {
        const stored = localStorage.getItem('loginData');
        if (stored) setFormData(JSON.parse(stored));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/api/user/login`, {
                email: formData.email,
                password: formData.password
            })
            console.log('axios res:', res.data.message);

            if (res.status === 200 && res.data.success && res.data.token) {
                localStorage.setItem('authToken', res.data.token);
                console.log('authToken:', res.data.token);
                console.log('user data:', res.data.user);

                // REMEMBER ME
                formData.rememberMe
                    ? localStorage.setItem('loginData', 
                        JSON.stringify({
                            ...res.data.user,
                            token: res.data.token
                        }))
                    : localStorage.removeItem('loginData');
                
                toast.success(res?.data?.message);
                setTimeout(() => {
                    onLoginSuccess({ token: res.data.token, user: res.data.user });
                }, 2000);
                
            } else {
                console.warn('unexpected error:', res.data);
                toast.error(res?.data?.message)
            }

        } catch (error) {
            console.error('axios error:', error);
            const msg = error.response?.data?.message || error.message || 'login failed'
            toast.error(msg);
        }
    }

    const handleChange = ({ target: { name, value, type, checked }}) => 
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

    const toggleShowPassword = () => setShowPassword(prev => !prev);

    return (
        <div className='space-y-6 relative'>
            <form 
                onSubmit={handleSubmit} 
                className='space-y-6'
            >
                <div className='relative transition-all duration-200 hover:scale-[1.02]'>
                    <FaUser className={iconClass} />
                    <input 
                        type="email" 
                        name='email'
                        placeholder='Email'
                        value={formData.email}
                        onChange={handleChange}
                        className={`${inputBase} pl-10 pr-4 py-3`}
                    />
                </div>
                <div className='relative transition-all duration-200 hover:scale-[1.02]'>
                    <FaLock className={iconClass} />
                    <input 
                        type={showPassword ? 'text' : 'password'}
                        name='password'
                        placeholder='Password'
                        value={formData.password}
                        onChange={handleChange}
                        className={`${inputBase} pl-10 pr-10 py-3`}
                    />
                    <button
                        type="button"
                        onClick={toggleShowPassword}
                        className='absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-400'
                    >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>

                <div className='flex items-center'>
                    <Checkbox defaultSelected radius="sm">
                        Small
                    </Checkbox>
                </div>

                <button className='w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#2D1B0E] font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform'>
                    Sign In <FaArrowRight />
                </button>
            </form>

            <div className='text-center'>
                <Link 
                    to='/signup'
                    onClick={onClose}
                    className='inline-flex items-center gap-2 text-amber-400 hover:text-amber-600 transition-colors'
                >
                    <FaUserPlus /> Create New Account
                </Link>
            </div>
        </div>
    )
}

export default Login