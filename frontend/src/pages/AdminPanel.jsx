import React from 'react'
import { useState } from 'react'
import { styles } from '../assets/dummyadmin2';
import { FiHeart, FiStar, FiUpload } from 'react-icons/fi';
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa'
import { toast } from 'sonner';

const AdminPanel = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        rating: 0,
        hearts: 0,
        total: 0,
        image: null,
        preview: '',
    });
    const [categories] = useState([
        'Breakfast', 'Lunch', 'Dinner', 'Mexican', 'Italian', 'Desserts', 'Drinks'
    ]);

    const [hoverRating, setHoverRating] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    // IMAGE HANDLING
    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFormData(prev => ({
                ...prev,
                image: file,
                preview: URL.createObjectURL(file)
            }))
        }
    }

    const handleRating = rating => setFormData(prev => ({ ...prev, rating }));

    const handleHearts = () => setFormData(prev => ({ ...prev, hearts: prev.hearts + 1 }));

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = new FormData();
            Object.entries(formData).forEach(([key, val]) => {
                if (key === "preview") {
                    toast.error('kindly add an image')
                    return;
                }
                payload.append(key, val);
            });

            const res = await axios.post(
                'https://excellent-bistro.onrender.com/api/items',
                payload,
                { headers: { 'Content-Type': 'multipart/form-data' }}
            );

            if (res.status === 200) {
                toast.success(res?.data?.message);
                setFormData({
                    name: '',
                    description: '',
                    category: '',
                    price: '',
                    rating: 0,
                    hearts: 0,
                    total: 0,
                    image: null,
                    preview: '',
                })
            } else {
                toast.error(res?.data?.message);
            }
        } catch (error) {
            console.error('error uploading item:', error.response || error.message);
            console.log(error);
        }
    }

    return (
        <div className={styles.formWrapper}>
            <div className='max-w-4xl mx-auto'>
                <div className={styles.formCard}>
                    <h2 className={styles.formTitle}>Add New Menu Item</h2>

                    <form
                        className='space-y-6 sm:space-y-8'
                        onSubmit={handleSubmit}
                    >
                        <div className={styles.uploadWrapper}>
                            <label className={styles.uploadLabel}>
                                {formData.preview ? (
                                    <img 
                                        src={formData.preview}
                                        alt="Preview"
                                        className={styles.previewImage}
                                    />
                                ) : (
                                    <div className='text-center p-4'>
                                        <FiUpload className={styles.uploadIcon} />
                                        <p className={styles.uploadText}>
                                            Click to upload product image
                                        </p>
                                    </div>
                                )}
                                <input 
                                    type="file"
                                    accept='image/*'
                                    onChange={handleImageUpload}
                                    className='hidden' 
                                />
                            </label>
                        </div>

                        <div className='space-y-6'>
                            <div>
                                <label className='block mb-2 text-base sm:text-lg text-amber-400'>
                                    Product Name
                                </label>
                                <input 
                                    type='text'
                                    name='name'
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className={styles.inputField}
                                    placeholder='Enter Product Name'
                                />
                            </div>
                            <div>
                                <label className='block mb-2 text-base sm:text-lg text-amber-400'>
                                    Description
                                </label>
                                <textarea
                                    name='description'
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder='Enter Product Description'
                                    className={styles.inputField + ' h-32 sm:h-40'}
                                />
                            </div>
                            <div className={styles.gridTwoCols}>
                                <div>
                                    <label className='block mb-2 text-base sm:text-lg text-amber-400'>
                                        Category
                                    </label>
                                    <select 
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className={styles.inputField}
                                    >
                                        <option value="">
                                            Select category
                                        </option>
                                        {categories.map(c => (
                                            <option 
                                                value={c}
                                                key={c}
                                                className='bg-[#3A2B2B]'
                                            >
                                                {c}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className='block mb-2 text-base sm:text-lg text-amber-400'>
                                        Price (₦)
                                    </label>
                                    <div className={styles.relativeInput}>
                                        <FaRupeeSign className={styles.rupeeIcon}/>
                                        <input 
                                            type="number"
                                            name='price'
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            className={styles.inputField + ' pl-10 sm:pl-12'}
                                            placeholder='Enter Price'
                                            min='0'
                                            step='0.01'
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={styles.gridTwoCols}>
                                <div>
                                    <label className='block mb-2 text-base sm:text-lg text-amber-400'>
                                        Rating
                                    </label>
                                    <div className='flex gap-2'>
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => handleRating(star)}
                                                onMouseEnter={() => setHoverRating(star)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                className='text-2xl sm:text-3xl transition-transform hover:scale-110'
                                            >
                                                <FiStar 
                                                    className={
                                                        star <= (hoverRating || formData.rating)
                                                            ? 'text-amber-400 fill-current'
                                                            : 'text-amber-100/30'    
                                                    }
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className='block mb-2 text-base sm:text-lg text-amber-400'>
                                        Popularity
                                    </label>
                                    <div className='flex items-center gap-3 sm:gap-4'>
                                        <button
                                            type='button'
                                            onClick={handleHearts}
                                            className='text-2xl sm:text-3xl text-amber-400 hover:text-amber-300 transition-colors animate-pulse'
                                        >
                                            <FiHeart />
                                        </button>
                                        <input 
                                            type="number"
                                            name="hearts"
                                            value={formData.hearts}
                                            onChange={handleInputChange}
                                            className={styles.inputField + ' pl-10 sm:pl-12'} 
                                            placeholder='Enter Likes'
                                            min='0'
                                        />
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={styles.actionBtn}
                            >
                                Add To Menu
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel