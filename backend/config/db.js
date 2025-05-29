import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://blessedlyrics11:lvGkMFKcbuYQbTOL@excellent-bistro.ftdrrwt.mongodb.net/excellent-bistro')
        .then(() => console.log('DB CONNECTED'));
}