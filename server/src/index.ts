import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authroutes.js';
import { requireAuth } from './middlewares/authMiddleware.js';
import { requirePermission } from './middlewares/roleMiddleware.js';


import morgan from 'morgan';
import logger from './utils/logger.js';


// Inject Morgan to log all HTTP requests via Winston
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';

// Load environment variables
dotenv.config();

const app = express();

// ==========================================
// MIDDLEWARE
// ==========================================
app.use(cors()); // Allow frontend to make requests
app.use(express.json()); // Allow server to read JSON bodies
app.use(
  morgan(morganFormat, {
    stream: {
      // Trim removes the extra empty line that morgan adds
      write: (message: string) => logger.info(message.trim()),
    },
  })
);

// ==========================================
// API ROUTES
// ==========================================
app.get('/api/health', (req: Request, res: Response) => {
  res.send('HCM Brand Backend is running securely with TypeScript!');
});

// Use Auth Routes
app.use('/api/auth', authRoutes);
app.get('/api/stats', requireAuth, requirePermission(['read:analytics']), (req, res) => { res.json({ message: "Stats data" }); });

// ONLY users with the "write:products" permission can add new items
app.post('/api/products', requireAuth, requirePermission(['write:products']), (req, res) => { res.json({ message: "Product created" }); });

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
  logger.info(`🚀 Server running at http://localhost:${PORT}`);
});