import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authroutes.js';

// Load environment variables
dotenv.config();

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================
app.use(cors()); // Allow frontend to make requests
app.use(express.json()); // Allow server to read JSON bodies

// ==========================================
// API ROUTES
// ==========================================
app.get('/api/health', (req: Request, res: Response) => {
  res.send('HCM Brand Backend is running securely with TypeScript!');
});

// Use Auth Routes
app.use('/api/auth', authRoutes);

// ==========================================
// STATIC FILES & SPA FALLBACK
// ==========================================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// FIX: Updated for Express v5 wildcard syntax
// Using a native RegExp object /.*/ (No quotes!)
app.get(/.*/, (req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});