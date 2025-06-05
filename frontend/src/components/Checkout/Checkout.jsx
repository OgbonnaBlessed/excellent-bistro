import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaLock } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../../CartContext/CartContext'
import axios from 'axios'

const Checkout = () => {
    const { totalAmount, cartItems, clearCart } = useCart();
    const [formData, setFormData] = useState({
        firstName: '', lastName: '', phone: '',
        email: '', address: '', city: '',
        zipCode: '', paymentMethod: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    // GRAB TOKEN
    const token = localStorage.getItem('authToken');
    const authHeaders = token ? { Authorization: `Bearer ${token}` } : {};

    // PAYMENT GATEWAY
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const paymentStatus = params.get('payment_status');
        const sessionId = params.get('session_id');

        if (paymentStatus) {
            setLoading(true);

            if (paymentStatus === 'success' && sessionId) {
                axios.post('http://localhost:4000/api/orders/confirm',
                    { sessionId },
                    { headers: authHeaders })
                    .then(({ data }) => {
                        clearCart();
                        navigate('/myorder', { state: { order: data.order } })
                    })
                    .catch(err => {
                        console.error('Payment confirmation error:', err);
                        setError('Payment confirmation failed, please contact support.')
                    })
                    .finally(() => setLoading(false))
            } else if (paymentStatus === 'cancel') {
                setError('Payment was cancelled or failed, please contact support.')
                setLoading(false);
            }
        }

    }, [location.search, clearCart, navigate, authHeaders]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // CALCULATE PRICING
        const subtotal = Number(totalAmount.toFixed(2));
        const tax = Number((subtotal * 0.05).toFixed(2));
        const payload = {
            ...formData,
            subtotal,
            tax,
            total: Number((subtotal + tax).toFixed(2)),
            items: cartItems.map(({ item, quantity }) => ({
                name: item.name,
                price: item.price,
                quantity,
                imageUrl: item.imageUrl || ''
            }))
        };

        try {
            if (formData.paymentMethod === 'online') {
                const { data } = await axios.post(
                    'http://localhost:4000/api/orders',
                    payload,
                    { headers: authHeaders }
                );
                window.location.href = data.checkoutUrl;

            } else {
                // COD
                const { data } = await axios.post(
                    'http://localhost:4000/api/orders',
                    payload,
                    { headers: authHeaders }
                )
                clearCart(),
                navigate('/myorder', { state: { order: data.order } });
            }

        } catch (error) {
            console.error('error submitting order:', error);
            setError(error.response?.data?.message || 'failed to submit order');

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-b from-[#1A1212] to-[#2A1E1E] text-white py-16 px-4'>
            <div className='mx-auto max-w-4xl'>
                <Link
                    to='/cart'
                    className='flex items-center gap-2 text-amber-400 mb-8'
                >
                    <FaArrowLeft /> Back to Cart
                </Link>
                <h1 className='text-4xl font-bold text-center mb-8'>
                    Checkout
                </h1>
                <form
                    className='grid lg:grid-cols-2 gap-12'
                    onSubmit={handleSubmit}
                >
                    <div className='bg-[#4B3B3B]/80 p-6 rounde-3xl space-y-6'>
                        <h2 className='text-2xl font-bold'>Personal Information</h2>
                        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleInputChange} />
                        <Input label="Last Name" name="lastName" value={formData.lastName} onChange={handleInputChange} />
                        <Input label="Phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                        <Input label="Email" name="email" value={formData.email} onChange={handleInputChange} />
                        <Input label="Address" name="address" value={formData.address} onChange={handleInputChange} />
                        <Input label="City" name="city" value={formData.city} onChange={handleInputChange} />
                        <Input label="Zip Code" name="zipCode" value={formData.zipCode} onChange={handleInputChange} />
                    </div>

                    {/* PAYMENT DETAILS */}
                    <div className='bg-[#4B3B3B]/80 p-6 rounded-3xl space-y-6'>
                        <h2 className='text-2xl font-bold'>Payment Details</h2>

                        {/* ORDER ITEMS */}
                        <div className='space-y-4 mb-6'>
                            <h3 className='text-lg font-semibold text-amber-100'>Your Order Items</h3>

                            {cartItems.map(({ _id, item, quantity }) => (
                                <div
                                    key={_id}
                                    className='flex justify-between items-center bg-[#3A2B2B] p-3 rounded-lg'
                                >
                                    <div className='flex-1'>
                                        <span className='text-amber-100'>{item.name}</span>
                                        <span> x {quantity}</span>
                                    </div>
                                    <span className='text-amber-300'>
                                        ₹{(item.price * quantity).toFixed(2)}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <PaymentSummary totalAmount={totalAmount} />

                        {/* PAYMENT METHOD */}
                        <div>
                            <label className='block mb-2'>Payment Method</label>
                            <select 
                                name="paymentMethod"
                                value={formData.paymentMethod}
                                onChange={handleInputChange}
                                required
                                className='w-full bg-[#3A2B2B]/50 rounded-xl px-4 py-3'
                            >
                                <option value="">Select Method</option>
                                <option value="cod">Cash on Delivery</option>
                                <option value="online">Online Payment</option>
                            </select>
                        </div>

                        {error && 
                            <p className='text-red-400 mt-2'>
                                {error}
                            </p>
                        }

                        <button
                            type="submit"
                            disabled={loading}
                            className='w-full bg-gradient-to-r from-red-600 to-amber-600 py-4 rounded-xl font-bold flex justify-center items-center'
                        >
                            <FaLock className='mr-2'/>
                            { loading ? 'Processing' : 'Complete Order' }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

const Input = ({ label, name, type = 'text', value, onChange }) => (
    <div>
        <label className='block mb-1'>{label}</label>
        <input 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required
            className='w-full bg-[#3A2B2B]/50 rounded-xl px-4 py-2' 
        />
    </div>
)

const PaymentSummary = ({ totalAmount }) => {
    const subtotal = Number(totalAmount.toFixed(2));
    const tax = Number((subtotal * 0.05).toFixed(2));
    const total = Number((subtotal + tax).toFixed(2));

    return (
        <div className='space-y-2'>
            <div className='flex justify-between'>
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className='flex justify-between'>
                <span>Tax (5%):</span>
                <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className='flex justify-between font-bold border-t pt-2'>
                <span>Total:</span>
                <span>₹{total.toFixed(2)}</span>
            </div>
        </div>
    )
}

export default Checkout