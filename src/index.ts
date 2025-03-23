import express, { json, Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import appRoute from './routes/app.routes'
import morgan from 'morgan';
import { errorHandler, routNotFound } from './middlewares/error-handlers';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();


app.disable('x-powered-by');
app.disable('etag');

app.use(morgan('dev'));
app.use(cors());
app.use(json());



const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully!'))
  .catch((error) => console.error('❗ MongoDB connection error:', error));

app.use(express.json());

app.use('/posts', appRoute);


app.use(routNotFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


