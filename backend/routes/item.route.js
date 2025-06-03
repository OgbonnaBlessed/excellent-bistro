import express from 'express';
import multer from 'multer';
import { createItem, getItems, deleteItem } from '../controllers/item.controller.js';

const router = express.Router();

// IMAGE STORAGE
const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, 'uploads/'),
    filename: (_req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
})

const upload = multer({ storage });

router.post('/', upload.single('image'), createItem);
router.get('/', getItems);
router.delete('/:id', deleteItem);

export default router;