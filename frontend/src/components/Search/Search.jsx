import React, { useEffect, useState } from 'react';
import { FaSearch, FaPlus, FaMinus } from 'react-icons/fa';
import { useCart } from '../../CartContext/CartContext';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Search = () => {
    const location = useLocation();
    const queryParam = new URLSearchParams(location.search).get('q') || '';
    
    const [searchQuery, setSearchQuery] = useState(queryParam);
    const [searchData, setSearchData] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const { cartItems, addToCart, removeFromCart, updateQuantity } = useCart();

    useEffect(() => {
        const fetchSearchData = async () => {
            try {
                const res = await axios.get('https://excellent-bistro.onrender.com/api/items');
                setSearchData(res.data);
                setFilteredItems(res.data); // Display all items by default
            } catch (error) {
                console.error('Failed to load menu items:', error);
            }
        };
        fetchSearchData();
    }, []);

    useEffect(() => {
        if (queryParam && searchData.length > 0) {
            const query = queryParam.toLowerCase();
            const results = searchData.filter(item =>
                item.name.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query)
            );
            setFilteredItems(results);
        }
    }, [queryParam, searchData]);

    const getCartEntry = (id) => cartItems.find(ci => ci.item._id === id);

    const handleSearch = (e) => {
        e.preventDefault();

        const query = searchQuery.trim().toLowerCase();

        const results = searchData.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.category.toLowerCase().includes(query)
        );

        setFilteredItems(results);
    };

    return (
        <div className='bg-gradient-to-br from-[#1A120B] via-[#2E1E14] to-[#3E2B1D] min-h-screen py-16 px-4 sm:px-6 lg:px-8'>
            <div className='max-w-7xl mx-auto'>
                <form
                    onSubmit={handleSearch}
                    className="relative max-w-2xl mx-auto md:mx-0 group mb-16"
                >
                    <div className="relative flex items-center bg-amber-900/30 rounded-xl border-2 border-amber-500/30 shadow-2xl transition-all duration-300">
                        <div className="pl-6 pr-3 py-4">
                            <FaSearch className="text-xl text-amber-400/80" />
                        </div>
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder='Search by name or category...'
                            autoComplete='off'
                            className='w-full py-4 pr-6 bg-transparent outline-none placeholder-amber-200/70 text-lg font-medium tracking-wide text-white'
                        />
                        <button
                            type="submit"
                            className='mr-4 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-300 rounded-lg font-semibold text-amber-900 hover:from-amber-300 hover:to-amber-200 transition-all duration-300 shadow-lg hover:shadow-amber-300/20'
                        >
                            Search
                        </button>
                    </div>
                </form>

                <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
                    {filteredItems.map((item, i) => {
                        const cartEntry = getCartEntry(item._id);
                        const quantity = cartEntry?.quantity || 0;

                        return (
                            <div 
                                key={item._id}
                                className='relative bg-amber-900/20 rounded-2xl overflow-hidden border border-amber-800/30 backdrop-blur-sm flex flex-col transition-all duration-500'
                                style={{ zIndex: i }}
                            >
                                <div className='relative h-48 sm:h-56 md:h-60 flex items-center justify-center bg-black/10'>
                                    <img 
                                        src={item.imageUrl || item.image} 
                                        alt={item.name}
                                        className='max-h-full max-w-full object-contain transition-all duration-700'
                                    />
                                </div>
                                <div className='p-4 sm:p-6 flex flex-col flex-grow'>
                                    <div className='absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-amber-800/50 to-transparent opacity-50 transition-all duration-300' />
                                    <h3 className='text-xl sm:text-2xl mb-2 font-dancingscript text-amber-100 transition-colors'>
                                        {item.name}
                                    </h3>
                                    <p className='text-amber-100/80 text-xs sm:text-sm mb-4 font-cinzel leading-relaxed'>
                                        {item.description}
                                    </p>

                                    <div className='mt-auto flex items-center gap-4 justify-between'>
                                        <div className='bg-amber-100/10 backdrop-blur-sm px-3 py-1 rounded-2xl shadow-lg'>
                                            <span className='text-xl font-bold text-amber-300 font-dancingscript'>
                                                ₦{Number(item.price).toFixed(2)}
                                            </span>
                                        </div>

                                        <div className='flex items-center gap-2'>
                                            {quantity > 0 ? (
                                                <>
                                                    <button
                                                        className='w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-colors'
                                                        onClick={() =>
                                                            quantity > 1
                                                                ? updateQuantity(cartEntry._id, quantity - 1)
                                                                : removeFromCart(cartEntry._id)
                                                        }
                                                    >
                                                        <FaMinus className='text-amber-100' />
                                                    </button>
                                                    <span className='w-8 text-center text-amber-100'>
                                                        {quantity}
                                                    </span>
                                                    <button
                                                        className='w-8 h-8 rounded-full bg-amber-900/40 flex items-center justify-center hover:bg-amber-800/50 transition-colors'
                                                        onClick={() => updateQuantity(cartEntry._id, quantity + 1)}
                                                    >
                                                        <FaPlus className='text-amber-100' />
                                                    </button>
                                                </>
                                            ) : (
                                                <button 
                                                    onClick={() => addToCart(item, 1)}
                                                    className='bg-amber-900/40 px-4 py-1.5 rounded-full font-cinzel text-xs uppercase sm:text-sm tracking-wider transition-transform duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-900/20 relative overflow-hidden border border-amber-800/50'
                                                >
                                                    <span className='relative z-10 text-xs text-black'>
                                                        Add to Cart
                                                    </span>
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Search;