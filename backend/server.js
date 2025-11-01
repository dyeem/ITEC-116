import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import cors from 'cors';

import authRoutes from './routes/authRoute.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//ROUTES
app.use('/api/auth', authRoutes);

app.listen(5000, () => {
    connectDB();
    console.log('Server is running on port 5000');
});

