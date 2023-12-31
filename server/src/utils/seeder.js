import dotenv from 'dotenv';
import sectors from '../dev-data/sectors.js';
import Sector from '../models/sector.model.js';
import connectDB from '../config/db.js';

dotenv.config();

connectDB();

const importData = async () => {

    try {

        await Sector.deleteMany();

        await Sector.insertMany(sectors);

        console.log(`Data Imported Successfully !!`);

    } catch(err) {
        console.log(err);
    }

}

const destroyData = async () => {

    try {

        await Sector.deleteMany();

        console.log(`Data Destroyed Successfully !!`);
        process.exit();

    } catch(err) {
        console.log(err);
        process.exit(1);
    }

}

if(process.argv[2] === '--import') {
    importData();
} else if(process.argv[2] === '--delete') {
    destroyData();
}