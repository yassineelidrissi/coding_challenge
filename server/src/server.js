import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';

import app from './app.js'

dotenv.config();
connectDB();


if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

const PORT = process.env.PORT || 8080;
let server;
server = app.listen(PORT, () => console.log(`Server is running in ${process.env.NODE_ENV} on Port ${PORT}`));

export default server;