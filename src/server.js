import express from 'express';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { authMiddleware } from './middleware/auth.js';
import { roleMiddleware } from './middleware/role.js';
import { authRoutes } from './routes/auth.js';
import { productRoutes } from './routes/products.js';

config();

const app = express();
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', authMiddleware, productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});