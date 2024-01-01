import path from 'path';
import express from 'express';
import cors from 'cors';
import sectorRoutes from './routes/sector.route.js';
import userRoutes from './routes/user.route.js';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

const app = express();

const __dirname = path.resolve();

app.use(cors());
app.options('*', cors());

app.use(express.json());

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use('/api', sectorRoutes);
app.use('/api', userRoutes);

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});



export default app;