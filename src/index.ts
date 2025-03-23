import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import appRoute from '../src/routes/app.routes'

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

// Connect to MongoDB
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch((error) => console.error('❗ MongoDB connection error:', error));

// Middleware
app.use(express.json());

app.use('/posts', appRoute);


// Example Route
app.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'Pong! 🏓' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
