import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.route.js'

const app = express();
const port = process.env.PORT || 4000;

// DATABASE
connectDB();

// MIDDLEWARE
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = ['http://localhost:5173', 'http://localhost:5174'];
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('API WORKING');
})

app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`)
});