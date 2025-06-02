import express from 'express';
import authMiddleWare from '../middleware/auth.js';
import { getCart, addToCart, deleteCartItem, clearCart, updateCartItem } from '../controllers/cart.controller.js';

const router = express.Router();

router.route('/')
    .get(authMiddleWare, getCart)
    .post(authMiddleWare, addToCart)
router.post('/clear', authMiddleWare, clearCart);
router.route('/:id')
    .put(authMiddleWare, updateCartItem)
    .delete(authMiddleWare, deleteCartItem)

export default router;