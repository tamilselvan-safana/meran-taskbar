import exp from 'express';
import taskRoutes from './routes/taskroutes.js';
import connectDB from './config/db.js';
import dot from 'dotenv';
import cors from 'cors';

dot.config();

const app = exp();

//app.use(cors(
 // { origin: 'http://localhost:5173' }
//));

app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));


app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use('/api/tasks', taskRoutes);

connectDB().then(() => {
  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
});




