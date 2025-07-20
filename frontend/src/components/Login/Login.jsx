import { useEffect, useState } from 'react'
import { FaArrowRight, FaCheckCircle, FaEye, FaEyeSlash, FaLock, FaUser, FaUserPlus } from 'react-icons/fa';
import { iconClass, inputBase } from '../../assets/dummydata';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner';
import Checkbox from '../Common/Checkbox/Checkbox';

const API_URL = import.meta.env.VITE_API_URL

const Login = ({ onLoginSuccess, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '', rememberMe: '' });
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('loginData');
        if (stored) {
            const parsed = JSON.parse(stored);
            const now = new Date().getTime();

            if (parsed.expiresAt && parsed.expiresAt > now) {
                setFormData({
                    email: parsed.user?.email || '',
                    password: '',
                    rememberMe: true
                });
                setIsChecked(true);

            } else {
                localStorage.removeItem('loginData');
            }
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${API_URL}/api/user/login`, {
                email: formData.email,
                password: formData.password,
                rememberMe: formData.rememberMe
            })
            console.log('axios res:', res.data.message);

            if (res.status === 200 && res.data.success && res.data.token) {
                localStorage.setItem('authToken', res.data.token);
                console.log('authToken:', res.data.token);
                console.log('user data:', res.data.user);

                if (formData.rememberMe) {
                    const expiresAt = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;
                    localStorage.setItem('loginData',
                        JSON.stringify({
                            token: res.data.token,
                            user: res.data.user,
                            expiresAt
                        })
                    );
                } else {
                    localStorage.removeItem('loginData');
                }

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

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleCheckboxChange = () => {
        setIsChecked(prev => {
            const updated = !prev;
            setFormData((prevForm) => ({
                ...prevForm,
                rememberMe: updated
            }));
            return updated;
        });
    };

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

                <Checkbox 
                    label="Remember me"
                    isChecked={isChecked}
                    onChange={handleCheckboxChange}
                    customStyles={{
                        container: { width: 'fit-content' }
                    }}
                />

                <button className='w-full py-3 bg-gradient-to-r from-amber-400 to-amber-600 text-[#2D1B0E] font-bold rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.95] transition-transform'>
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