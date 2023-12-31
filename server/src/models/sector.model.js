import mongoose from "mongoose";

const sectorSchema = new mongoose.Schema({
    name: String
}, {
    timestamps: true
});

const Sector = mongoose.model('Sector', sectorSchema);

export default Sector;