import exp from 'express';
import taskRoutes from './routes/taskroutes.js';
import connectDB from './config/db.js';
import dot from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dot.config();

const app = exp();

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:5173' }));
}

app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));

app.use('/api/tasks', taskRoutes);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === 'production') {
  app.use(exp.static(path.join(__dirname, '../../frontend/dist')));

  // Catch-all route for React frontend
  app.use((_req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist/index.html'));
  });
} else {
  app.get('/', (_req, res) => {
    res.send('API is running....');
  });
}


const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

