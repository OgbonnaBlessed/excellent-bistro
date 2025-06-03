import express from 'express';
import { confirmPayment, createOrder, getAllOrders, getOrderById, getOrders, updateAnyOrder, updateOrder } from '../controllers/order.controller.js';
import authMiddleware from '../middleware/auth.js'

const router = express.Router();

router.get('/getall', getAllOrders);
router.put('/getall/:id', updateAnyOrder);

// PROTECT REST OF ROUTES USING MIDDLEWARE
router.use(authMiddleware);

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/confirm', confirmPayment);
router.get('/:id', getOrderById);
router.put('/:id', updateOrder);

export default router;