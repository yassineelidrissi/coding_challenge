import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const DB = process.env.DB_URL;
       await mongoose.connect(DB);

        console.log('Connection Successed !!');

    } catch(err) {
        console.log(err);
    }
}

export default connectDB;