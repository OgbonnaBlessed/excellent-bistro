import itemModel from "../models/item.model.js";

export const createItem = async (req, res, next) => {
    try {
        const { name, description, category, price, rating, hearts } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        if (!imageUrl) {
            res.status(400).json({ message: 'kindly add an image'});
            return;
        }

        if (!name || !description || !category || !price || rating || !hearts) {
            res.status(400).json({ message: 'please fill all fields'});
            return;
        }

        const total = Number(price) * 1;

        const newItem = new itemModel({
            name,
            description,
            category,
            price,
            rating,
            hearts,
            imageUrl,
            total
        })

        const saved = await newItem.save();
        res.status(200).json({ message: 'item added successfully', saved });

    } catch (err) {
        if (err.code === 11000) {
            res.status(400).json({ message: 'Item name already exists' });
        }
    }
}

// GET ALL ITEMS
export const getItems = async (_req, res, next) => {
    try {
        const items = await itemModel.find().sort({ createdAt: -1 });
        const host = `${_req.protocol}://${_req.get('host')}`;

        const withFullUrl = items.map(i => ({
            ...i.toObject(),
            imageUrl: i.imageUrl ? host + i.imageUrl : '',
        }))
        res.json(withFullUrl);

    } catch (err) {
        next(err);
    }
}

// DELETE ITEMS
export const deleteItem = async (req, res, next) => {
    try {
        const removed = await itemModel.findByIdAndDelete(req.params.id);
        if (!removed) return res.status(404).json({ message: "item not found" })
        res.status(204).end();
    
    } catch (err) {
        next(err);
    }
}