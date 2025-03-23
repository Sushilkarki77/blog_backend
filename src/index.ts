import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

// Basic Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, MongoDB with TypeScript!');
});

// Example Route
app.get('/ping', (req: Request, res: Response) => {
  res.json({ message: 'Pong! 🏓' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
