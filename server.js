import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './api/index.js';
import connectDB from './api/config/db.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

connectDB();

// ✅ Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public/dist')));

// ✅ API routes
app.use('/api', apiRoutes);

// ✅ Root route serves the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/dist', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
