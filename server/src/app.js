import path from 'path';
import express from 'express';
import cors from 'cors';
import sectorRoutes from './routes/sector.route.js';
import userRoutes from './routes/user.route.js';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

const app = express();

const __dirname = path.resolve();

app.use(cors());
app.options('*', cors());

app.use(helmet());

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour !'
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

app.use('/api', sectorRoutes);
app.use('/api', userRoutes);

app.use(express.static(path.join(__dirname, '../../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'));
})


export default app;