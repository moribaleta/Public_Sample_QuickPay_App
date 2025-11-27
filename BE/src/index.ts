import express from 'express';
import type { Application, Request, Response } from 'express';
import apiRoutes from './routes/apiRoutes.js';

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Manual CORS configuration - no package needed
app.use((req: Request, res: Response, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5174');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight OPTIONS requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('API is up and running! 🚀');
});

app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
