import express, { type Request, type Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK' });
});

// Static Files
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

// FIX: Updated for Express v5 wildcard syntax
// Using a native RegExp object /.*/ (No quotes!)
app.get(/.*/, (req: Request, res: Response) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});