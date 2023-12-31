import express from 'express';
import cors from 'cors';
import sectorRoutes from './routes/sector.route.js';
import userRoutes from './routes/user.route.js';

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use('/api', sectorRoutes);
app.use('/api', userRoutes);

export default app;