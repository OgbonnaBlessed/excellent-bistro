/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { FaDownload, FaPlay, FaSearch, FaTimes } from 'react-icons/fa'
import { bannerAssets } from '../../assets/dummydata'
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showVideo, setShowVideo] = useState(false);
    const { bannerImage, orbitImages, video } = bannerAssets;
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        } else {
            navigate('/search');
        }
    };

    return (
        <div className="relative">
            <div className="bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700 text-white py-16 px-4 sm:px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-900/20 to-amber-700/10" />

                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
                    {/* LEFT CONTENT */}
                    <div className="flex-1 space-y-8 relative md:pr-8 lg:pr-19 text-center md:text-left">
                        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-serif drop-shadow-md">
                            We're Here <br />
                            <span className="text-amber-400 bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text">
                                For Food & Delivery
                            </span>
                        </h1>

                        <p className="text-lg md:text-lg lg:text-xl font-playfair italic sm:text-xl text-amber-100 max-w-xl opacity-90 mx-auto md:mx-0">
                            Best cooks and best delivery guys all at your service. Hot tasty food will reach you in 60 minutes
                        </p>

                        <form
                            onSubmit={handleSearch}
                            className="relative max-w-2xl mx-auto md:mx-0 group"
                        >
                            <div className="relative flex items-center bg-amber-900/30 rounded-xl border-2 border-amber-500/30 shadow-2xl hover:bg-amber-400/50 transition-all duration-300">
                                <div className="pl-6 pr-3 py-4">
                                    <FaSearch className="text-xl text-amber-400/80" />
                                </div>
                                <input 
                                    type="text" 
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder='Discover your next favorite meal...'
                                    className='w-full py-4 pr-6 bg-transparent outline-none placeholder-amber-200/70 text-lg font-medium tracking-wide'
                                />
                                <button
                                    type="submit"
                                    className='mr-4 px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-300 rounded-lg font-semibold text-amber-900 hover:from-amber-300 hover:to-amber-200 transition-all duration-300 shadow-lg hover:shadow-amber-300/20'
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        <div className='flex flex-wrap gap-4 justify-center md:justify-start mt-6'>
                            <button
                                onClick={() => setShowVideo(true)}
                                className='group flex items-center gap-3 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 px-6 py-3 rounded-xl transition-all duration-300 shadow-xl hover:shadow-amber-300/30'
                            >
                                <FaPlay className='text-xl text-amber-900' />
                                <span className='text-lg text-amber-900 font-semibold'>Watch Video</span>
                            </button>
                        </div>
                    </div>

                    {/* RIGHT CONTAINER WITH ORBITAL IMAGES */}
                    <div className="flex-1 relative group mt-8 md:mt-0 min-h-[300px] sm:min-h-[400px]">
                        {/* MAIN IMG */}
                        <div className='relative rounded-full p-1 bg-gradient-to-br from-amber-700 via-amber-800 to-amber-400 shadow-2xl z-20 w-[250px] xs:w-[300px] sm:w-[350px] h-[250px] xs:h-[300px] sm:h-[350px] mx-auto'>
                            <img 
                                src={bannerImage} 
                                alt="Banner" 
                                className='rounded-full border-4 xs:border-8 border-amber-900 w-full h-full object-cover object-top' 
                            />
                            <div className='absolute inset-0 rounded-full bg-gradient-b from-transparent to-amber-900/40 mix-blend-color'/>
                        </div>

                        {/* ORBITAL IMAGES */}
                        {orbitImages.map((imgSrc, index) => (
                            <div
                                key={index}
                                className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${index === 0 ? 'orbit' : `orbit-delay-${index * 5}`} w-[80px] xs:w-[100px] sm:w-[150px] h-[80px] xs:h-[100px] sm:h-[150px]`}
                            >
                                {/* ORBITAL IMAGES */}
                                <img 
                                    src={imgSrc} 
                                    alt={`Orbiting ${index + 1}`} 
                                    className='w-full h-full rounded-full border border-amber-500/30 shadow-lg bg-amber-900/20 p-1 object-cover'
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* VIDEO MODAL */}
            <AnimatePresence mode='wait'>
                {showVideo && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className='fixed inset-0 flex items-center justify-center z-50 bg-[#2D1B0E]/20 backdrop-blur-sm p-4'
                    >
                        <button 
                            onClick={() => setShowVideo(false)}
                            className='absolute top-6 right-6 text-amber-400 hover:text-amber-300 text-3xl z-10 transition-all'
                        >
                            <FaTimes />
                        </button>

                        <div className='w-full max-w-4xl mx-auto'>
                            <video
                                controls
                                autoPlay
                                className='w-full aspect-video object-contain rounded-lg shadow-2xl'
                            >
                                <source src={video} type='video/mp4' />
                            </video>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Banner